import { NextResponse } from 'next/server';
import { plans } from '../../content';

export async function POST(request: Request) {
  let body: unknown;
  try { body = await request.json(); } catch { return NextResponse.json({ message: 'Invalid request.' }, { status: 400 }); }
  if (!body || typeof body !== 'object') return NextResponse.json({ message: 'Invalid request.' }, { status: 400 });
  const order = body as Record<string, unknown>;
  const plan = order.planId === 'weekly' || order.planId === 'daily' ? plans[order.planId] : null;
  if (!plan) return NextResponse.json({ message: 'Please select a valid coaching plan.' }, { status: 400 });
  if (typeof order.fullName !== 'string' || order.fullName.trim().length < 2 || order.fullName.length > 100 || typeof order.email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(order.email) || order.email.length > 254 || typeof order.phone !== 'string' || order.phone.trim().length < 7 || order.phone.length > 30 || order.acceptedTerms !== true) {
    return NextResponse.json({ message: 'Check your name, email, phone, and required agreement.' }, { status: 400 });
  }
  // Fail closed: no order or payment is claimed unless a verified provider and persistence layer are deployed.
  if (process.env.PAYMENT_PROVIDER !== 'paymob' || !process.env.PAYMOB_API_KEY || !process.env.DATABASE_URL) {
    return NextResponse.json({ message: `Payment setup is incomplete. ${plan.price.toLocaleString('en-US')} EGP is the selected total, but no order was created and no payment was taken. Please contact +20 101 154 9171 to arrange coaching.` }, { status: 503 });
  }
  return NextResponse.json({ message: 'Payment provider credentials were detected, but the Paymob integration and verified callback are not implemented. No payment was taken.' }, { status: 503 });
}
