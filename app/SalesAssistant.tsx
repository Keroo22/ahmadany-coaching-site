'use client';

import { useState } from 'react';
import type { FormEvent } from 'react';
import { MessageCircle, Send, X } from 'lucide-react';

type Message = { role: 'assistant' | 'user'; text: string };
const chatEndpoint = process.env.NEXT_PUBLIC_CHATBOT_ENDPOINT || '';
const whatsapp = 'https://wa.me/201011549171';
const welcome = 'Hi! I can help you compare coaching plans, see what is included, or get in touch with Coach Ahmadany.';

function quickReply(question: string) {
  const q = question.toLowerCase();
  if (/price|cost|plan|package|how much/.test(q)) return 'There are two one-time plans: Weekly Follow-Up is EGP 2,500 for one month; Daily Follow-Up is EGP 3,600 for three months. Payment is not collected on this preview site. I can help you ask the coach about availability.';
  if (/include|feature|nutrition|training|support/.test(q)) return 'Both plans include a custom training and nutrition plan. Weekly includes weekly progress check-ins and WhatsApp support. Daily adds daily check-ins, priority WhatsApp support, and meal plan adjustments.';
  if (/recommend|which|goal|muscle|weight|fat|begin/.test(q)) return 'If you want regular guidance, Weekly Follow-Up includes a monthly plan and weekly check-ins. If you prefer more frequent accountability, Daily Follow-Up includes daily check-ins over three months. The coach can recommend the best fit after hearing your goals.';
  return 'I can help with plan prices, what each plan includes, and how to contact the coach. For personalized advice, send the coach a WhatsApp message.';
}

export default function SalesAssistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [messages, setMessages] = useState<Message[]>([{ role: 'assistant', text: welcome }]);

  async function send(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const question = input.trim();
    if (!question || busy) return;
      const next = [...messages, { role: 'user' as const, text: question }];
    setMessages(next);
    setInput('');
    if (!chatEndpoint) {
      setMessages([...next, { role: 'assistant', text: quickReply(question) }]);
      return;
    }
    setBusy(true);
    try {
      const response = await fetch(chatEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next.slice(-12).map(({ role, text }) => ({ role, content: text.slice(0, 1000) })) }),
      });
      if (!response.ok) throw new Error('Chat service unavailable');
      const data = await response.json() as { reply?: string };
      if (!data.reply) throw new Error('Missing assistant reply');
      setMessages([...next, { role: 'assistant', text: data.reply }]);
    } catch {
      setMessages([...next, { role: 'assistant', text: 'I could not reach the chat service. You can still ask Coach Ahmadany directly on WhatsApp.' }]);
    } finally {
      setBusy(false);
    }
  }

  const waHref = `${whatsapp}?text=${encodeURIComponent('Hi Coach Ahmadany, I have a question about your online coaching plans.')}`;

  return <div className="sales-chat">
    {open && <section className="sales-chat-panel" aria-label="Coaching sales assistant">
      <header className="sales-chat-header"><span className="sales-chat-avatar"><MessageCircle size={17}/></span><div><strong>AHMADANY ASSISTANT</strong><small>{chatEndpoint ? 'AI SALES SUPPORT' : 'PLAN GUIDE · WHATSAPP HANDOFF'}</small></div><button type="button" onClick={() => setOpen(false)} aria-label="Close chat"><X size={18}/></button></header>
      <div className="sales-chat-messages" aria-live="polite">{messages.map((message, index) => <p className={`sales-chat-message ${message.role}`} key={`${index}-${message.role}`}>{message.text}</p>)}{busy && <p className="sales-chat-message assistant">Thinking…</p>}</div>
      <a className="sales-chat-whatsapp" href={waHref} target="_blank" rel="noreferrer">Talk to Coach Ahmadany on WhatsApp ↗</a>
      <form className="sales-chat-form" onSubmit={send}><input aria-label="Ask a question" maxLength={500} value={input} onChange={event => setInput(event.target.value)} placeholder="Ask about plans…"/><button type="submit" disabled={busy || !input.trim()} aria-label="Send message"><Send size={16}/></button></form>
    </section>}
    <button type="button" className="sales-chat-launcher" onClick={() => setOpen(!open)} aria-expanded={open} aria-label={open ? 'Close coaching assistant' : 'Open coaching assistant'}>{open ? <X size={22}/> : <><MessageCircle size={20}/><span>ASK ABOUT COACHING</span></>}</button>
  </div>;
}
