import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const maxDuration = 30;

const fallbackOrigin = 'https://keroo22.github.io';
const windows = new Map<string, { count: number; expiresAt: number }>();

function allowedOrigin(request: Request) {
  const origin = request.headers.get('origin');
  const configured = (process.env.CHAT_ALLOWED_ORIGIN || fallbackOrigin).split(',').map(value => value.trim());
  const vercelOrigin = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '';
  const allowed = [...configured, vercelOrigin].filter(Boolean);
  return origin && allowed.includes(origin) ? origin : null;
}

function corsHeaders(origin: string) {
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
    Vary: 'Origin',
  };
}

function rateLimited(request: Request) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  const now = Date.now();
  const window = windows.get(ip);
  if (!window || window.expiresAt <= now) {
    windows.set(ip, { count: 1, expiresAt: now + 60_000 });
    if (windows.size > 1_000) {
      for (const [key, value] of windows) if (value.expiresAt <= now) windows.delete(key);
    }
    return false;
  }
  if (window.count >= 12) return true;
  window.count += 1;
  return false;
}

export async function OPTIONS(request: Request) {
  const origin = allowedOrigin(request);
  if (!origin) return new Response(null, { status: 403 });
  return new Response(null, { status: 204, headers: corsHeaders(origin) });
}

export async function POST(request: Request) {
  const origin = allowedOrigin(request);
  if (!origin) return NextResponse.json({ error: 'Origin not allowed.' }, { status: 403 });
  const headers = corsHeaders(origin);
  if (rateLimited(request)) return NextResponse.json({ error: 'Too many messages. Please try again in a minute.' }, { status: 429, headers });

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return NextResponse.json({ error: 'Chat service is not configured.' }, { status: 503, headers });
  const contentLength = Number(request.headers.get('content-length') || 0);
  if (contentLength > 16_000) return NextResponse.json({ error: 'Please send a shorter conversation.' }, { status: 413, headers });

  try {
    const body = await request.json() as { messages?: unknown };
    if (!Array.isArray(body.messages) || body.messages.length < 1 || body.messages.length > 12) {
      return NextResponse.json({ error: 'Please send a shorter conversation.' }, { status: 400, headers });
    }
    const messages = body.messages.map((item: unknown) => {
      if (!item || typeof item !== 'object') throw new Error('Invalid message');
      const message = item as { role?: unknown; content?: unknown };
      if ((message.role !== 'user' && message.role !== 'assistant') || typeof message.content !== 'string') throw new Error('Invalid message');
      return { role: message.role, content: message.content.trim().slice(0, 1_000) };
    }).filter(message => message.content.length > 0);
    if (!messages.length || messages.some(message => message.content.length > 1_000)) {
      return NextResponse.json({ error: 'Please send a shorter message.' }, { status: 400, headers });
    }

    const openAIResponse = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || 'gpt-5-mini',
        instructions: `You are the friendly online sales assistant for Coach Mohamed Ahmedany in Cairo. Your job is to help visitors understand the coaching plans and, when interested, encourage them to contact the coach on WhatsApp. Use only these facts: Weekly Follow-Up costs 2,500 EGP for one month and includes a custom training and nutrition plan, weekly progress check-ins, and WhatsApp support. Daily Follow-Up costs 3,600 EGP for three months and includes a custom plan, daily check-ins, priority WhatsApp support, and meal plan adjustments. These are one-time totals. This website does not collect payment or create orders. Do not invent discounts, guarantees, credentials, results, or availability. Do not give medical, injury, diagnosis, or treatment advice; suggest that the visitor consult a qualified professional and message the coach about coaching fit. Do not ask visitors to share health details. Keep answers warm, concise, and focused on helping them choose a plan or contact the coach. Reply in the language the visitor uses.`,
        input: messages,
        max_output_tokens: 220,
        store: false,
      }),
      signal: AbortSignal.timeout(25_000),
    });
    if (!openAIResponse.ok) return NextResponse.json({ error: 'The assistant is temporarily unavailable.' }, { status: 502, headers });
    const result = await openAIResponse.json() as {
      output_text?: string;
      output?: Array<{ type?: string; content?: Array<{ type?: string; text?: string }> }>;
    };
    const reply = result.output_text || result.output?.flatMap(item => item.content || []).filter(part => part.type === 'output_text').map(part => part.text || '').join('').trim();
    if (!reply) return NextResponse.json({ error: 'The assistant returned no answer.' }, { status: 502, headers });
    return NextResponse.json({ reply }, { headers });
  } catch {
    return NextResponse.json({ error: 'The assistant is temporarily unavailable.' }, { status: 502, headers });
  }
}
