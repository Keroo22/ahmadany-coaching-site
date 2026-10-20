'use client';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { plans } from '../content';

function CheckoutForm() {
  const params = useSearchParams();
  const planId = params.get('plan') === 'daily' ? 'daily' : 'weekly';
  const lang = params.get('lang') === 'ar' ? 'ar' : 'en';
  const plan = plans[planId];
  const ar = lang === 'ar';
  useEffect(() => { document.documentElement.dir = ar ? 'rtl' : 'ltr'; document.documentElement.lang = ar ? 'ar' : 'en'; }, [ar]);
  const text = ar ? { back: 'العودة إلى الخطط', eyebrow: 'أحمداني · مراجعة آمنة للخطة', title: 'خطوتك القادمة.', summary: 'ملخص الطلب', weekly: 'متابعة أسبوعية', daily: 'متابعة يومية', weeklyDesc: 'تدريب وتغذية مخصصان مع متابعة أسبوعية.', dailyDesc: 'تدريب مخصص مع متابعة يومية ودعم أسرع.', duration: 'مدة التدريب', month: 'شهر واحد', months: 'ثلاثة أشهر', oneTime: 'إجمالي لمرة واحدة · بدون تجديد تلقائي', included: 'يشمل', payment: 'الدفع غير متاح حالياً. الموقع بانتظار تفعيل حساب تاجر مصري معتمد وإعداد بوابة الدفع. لن يتم خصم أي مبلغ ولن يتم إنشاء طلب.', details: 'بياناتك', fullName: 'الاسم بالكامل', email: 'البريد الإلكتروني', phone: 'الهاتف / واتساب', agreed: 'قرأت الشروط وسياسة الخصوصية والاسترداد وأوافق عليها.', terms: 'الشروط', privacy: 'الخصوصية', refunds: 'الاسترداد', continue: 'المتابعة إلى الدفع', checking: 'جارٍ التحقق…', disclaimer: 'يتم التحقق من السعر على الخادم. يلزم إعداد بوابة دفع وحساب تاجر معتمد قبل قبول المشتريات.' } : { back: 'BACK TO PLANS', eyebrow: 'AHMADANY · SECURE PLAN REVIEW', title: 'YOUR NEXT CHAPTER.', summary: 'Order summary', weekly: 'Weekly Follow-Up', daily: 'Daily Follow-Up', weeklyDesc: 'Personalized training and nutrition with weekly check-ins.', dailyDesc: 'Personalized coaching with daily check-ins and priority support.', duration: 'Coaching period', month: '1 month', months: '3 months', oneTime: 'One-time total · No automatic renewal', included: 'INCLUDED', payment: 'Payment is not available yet. This site is awaiting a verified Egyptian merchant account and payment provider configuration. No payment will be taken and this form will not create an order.', details: 'Your details', fullName: 'FULL NAME', email: 'EMAIL ADDRESS', phone: 'PHONE / WHATSAPP', agreed: 'I have reviewed and agree to the terms, privacy policy, and refund policy.', terms: 'terms', privacy: 'privacy policy', refunds: 'refund policy', continue: 'CONTINUE TO PAYMENT', checking: 'CHECKING…', disclaimer: 'The price is validated on the server. Payment provider credentials and an authorized merchant account are required before purchases can be accepted.' };
  const [status, setStatus] = useState('');
  const [busy, setBusy] = useState(false);
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setStatus(''); setBusy(true);
    const form = new FormData(e.currentTarget);
    const data = { planId, fullName: String(form.get('name') || '').trim(), email: String(form.get('email') || '').trim(), phone: String(form.get('phone') || '').trim(), acceptedTerms: form.get('terms') === 'on' };
    try {
      const response = await fetch('/api/checkout', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      const result = await response.json();
      setStatus(result.message || 'Checkout is not configured. Please contact the coach.');
    } catch { setStatus('Could not reach the checkout service. Please try again or contact the coach.'); }
    finally { setBusy(false); }
  }
  const planName = ar ? (planId === 'daily' ? text.daily : text.weekly) : plan.name;
  const planDescription = ar ? (planId === 'daily' ? text.dailyDesc : text.weeklyDesc) : plan.description;
  return <main className="checkout-wrap"><div className="checkout-shell"><a className="back-link" href={`/#pricing`}><ArrowLeft size={14}/> {text.back}</a><p className="eyebrow">{text.eyebrow}</p><h1 className="checkout-heading">{text.title}</h1><div className="checkout-grid"><section className="checkout-card"><h2>{text.summary}</h2><p className="checkout-plan-name">{planName}</p><p className="checkout-plan-description">{planDescription}</p><p className="checkout-duration">{text.duration}: {ar ? (planId === 'daily' ? text.months : text.month) : plan.duration}</p><p className="checkout-price">{plan.price.toLocaleString('en-US')} <small>EGP</small></p><p className="checkout-duration">{text.oneTime}</p><div className="checkout-includes">{text.included}<br/>{plan.features.map(f => <div key={f}>— {f}</div>)}</div><p className="checkout-notice">{text.payment}</p></section><form className="checkout-card checkout-fields" onSubmit={submit}><h2>{text.details}</h2><label>{text.fullName}<input name="name" required autoComplete="name" maxLength={100}/></label><label>{text.email}<input name="email" type="email" required autoComplete="email" maxLength={254}/></label><label>{text.phone}<input name="phone" type="tel" required autoComplete="tel" maxLength={30}/></label><label className="consent"><input name="terms" type="checkbox" required/><span>{ar ? <>{text.agreed} <a className="text-link" href="/terms">{text.terms}</a> · <a className="text-link" href="/privacy">{text.privacy}</a> · <a className="text-link" href="/refunds">{text.refunds}</a></> : <>I have reviewed the <a className="text-link" href="/terms">{text.terms}</a>, <a className="text-link" href="/privacy">{text.privacy}</a>, and <a className="text-link" href="/refunds">{text.refunds}</a>, and agree to them.</>}</span></label><button className="button button-lime" disabled={busy}>{busy ? text.checking : text.continue} <ArrowRight size={16}/></button><p className="checkout-state" role="status" aria-live="polite">{status}</p><p className="checkout-disclaimer">{text.disclaimer}</p></form></div></div></main>;
}
export default function CheckoutPage() { return <Suspense fallback={<main className="checkout-wrap"><p>Loading checkout…</p></main>}><CheckoutForm/></Suspense>; }
