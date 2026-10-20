'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { ArrowDown, ArrowDownRight, ArrowRight, Check, Menu, MoveUpRight, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { plans, steps, testimonials } from './content';
const ChromeOrb = dynamic(() => import('./ChromeOrb'), { ssr: false });

type Language = 'en' | 'ar';
const wa = 'https://wa.me/201011549171';
const copy = {
  en: { nav: ['Home', 'About', 'Programs', 'Pricing', 'Contact'], cta: 'Get started', eyebrow: 'ONLINE FITNESS COACHING', line1: 'STOP GUESSING.', line2: 'START', line3: 'TRANSFORMING.', intro: "Don't overthink it — message me now and start your transformation. With Coach Ahmadany, you train smart.", start: 'Start your journey', results: 'See results', problem: 'THE PROBLEM', problemTitle: "TIRED OF PROGRAMS THAT DON'T WORK?", solution: 'THE SOLUTION', solutionTitle: 'YOUR BODY. YOUR GOALS. YOUR PLAN.', solutionText: "Every body is different. Every schedule is different. That's why every plan I create is built from scratch — for you, not for the masses.", process: 'THE PROCESS', processTitle: 'FOUR STEPS. ONE NEW STANDARD.', stories: 'CLIENT STORIES', storiesTitle: 'REAL PEOPLE. REAL PROGRESS.', proof: 'PROOF', proofTitle: 'PROGRESS YOU CAN SEE.', investment: 'INVESTMENT', pricingTitle: 'CHOOSE YOUR PLAN.', pricingText: 'Expert coaching. A plan built around you. Support that keeps you moving.', coach: 'MEET YOUR COACH.', contact: "LET'S TALK ABOUT YOUR GOALS.", contactText: "Tell me what you're working toward. Let's find the right coaching approach for you.", final: 'READY TO TRANSFORM YOUR BODY?', book: 'Book free consultation', menu: 'Open navigation' },
  ar: { nav: ['الرئيسية', 'عن المدرب', 'البرامج', 'الأسعار', 'تواصل'], cta: 'ابدأ الآن', eyebrow: 'تدريب لياقة أونلاين', line1: 'كفاية تخمين.', line2: 'ابدأ', line3: 'رحلة التغيير.', intro: 'لا تفكر كثيراً — راسلني الآن وابدأ رحلتك. مع كابتن أحمداني، تمرّن بذكاء.', start: 'ابدأ رحلتك', results: 'شاهد النتائج', problem: 'المشكلة', problemTitle: 'هل سئمت من خطط لا تنجح؟', solution: 'الحل', solutionTitle: 'جسمك. أهدافك. خطتك.', solutionText: 'كل جسم مختلف وكل جدول مختلف. لذلك أصمم كل خطة من البداية لتناسبك أنت.', process: 'الخطوات', processTitle: 'أربع خطوات. معيار جديد.', stories: 'قصص العملاء', storiesTitle: 'أشخاص حقيقيون. تقدم حقيقي.', proof: 'النتائج', proofTitle: 'تقدم تراه بنفسك.', investment: 'الاشتراك', pricingTitle: 'اختر خطتك.', pricingText: 'تدريب متخصص. خطة تناسبك. ودعم يساعدك على الاستمرار.', coach: 'تعرف على مدربك.', contact: 'لنتحدث عن أهدافك.', contactText: 'أخبرني بما تريد تحقيقه ولنجد طريقة التدريب المناسبة لك.', final: 'هل أنت مستعد لتغيير جسمك؟', book: 'احجز استشارة مجانية', menu: 'افتح القائمة' },
};

export default function Home() {
  const [lang, setLang] = useState<Language>('en');
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [orbEnabled, setOrbEnabled] = useState(false);
  const router = useRouter();
  const t = copy[lang];
  useEffect(() => {
    const saved = localStorage.getItem('ahmadany-language');
    const languageFrame = window.requestAnimationFrame(() => { if (saved === 'ar') setLang('ar'); setOrbEnabled(window.innerWidth > 640 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches); });
    const update = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', update, { passive: true }); update();
    return () => { window.cancelAnimationFrame(languageFrame); window.removeEventListener('scroll', update); };
  }, []);
  useEffect(() => { document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'; document.documentElement.lang = lang; localStorage.setItem('ahmadany-language', lang); }, [lang]);
  const checkout = (id: string) => router.push(`/checkout?plan=${id}&lang=${lang}`);

  return <main>
    <header className={`nav ${scrolled ? 'nav-scrolled' : ''}`}>
      <a className="wordmark" href="#home" aria-label="Ahmadany home">AHMADANY<span>®</span></a>
      <nav className={menuOpen ? 'nav-links nav-links-open' : 'nav-links'} aria-label="Main navigation">
        {t.nav.map((label, i) => <a key={label} onClick={() => setMenuOpen(false)} href={['#home','#about','#programs','#pricing','#contact'][i]}>{label}</a>)}
      </nav>
      <div className="nav-actions"><button className="language" onClick={() => setLang(lang === 'en' ? 'ar' : 'en')} aria-label="Switch language">{lang === 'en' ? 'عربي' : 'EN'}</button><a className="button button-lime nav-cta" href="#pricing">{t.cta}<ArrowRight size={15}/></a><button className="menu-button" aria-label={menuOpen ? 'Close navigation' : t.menu} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X/> : <Menu/>}</button></div>
    </header>

    <section className="hero" id="home">
      <div className="hero-photo" role="img" aria-label="Athlete training in a dramatic, shadowy gym" />
      <div className="hero-scrim" />
      <div className="hero-gridlines" />
      <div className="hero-3d">{orbEnabled && <ChromeOrb/>}</div>
      <div className="hero-content reveal">
        <div className="eyebrow"><span className="live-dot"/>{t.eyebrow}</div>
        <h1>{t.line1}<br/>{t.line2} <span>{t.line3}</span></h1>
        <p className="hero-copy">{t.intro}</p>
        <div className="hero-buttons"><a className="button button-lime" href="#pricing">{t.start}<ArrowRight size={17}/></a><a className="button button-ghost" href="#stories">{t.results}<ArrowDownRight size={17}/></a></div>
      </div>
      <div className="hero-index"><span>01 — 06</span><i/><span>COACHING FOR YOUR NEXT LEVEL</span></div>
      <a className="scroll-cue" href="#proof" aria-label="Scroll to explore"><span>SCROLL TO EXPLORE</span><ArrowDown size={15}/></a>
      <div className="hero-sideword">TRAIN / EAT / REPEAT</div>
    </section>

    <section className="trust-strip" aria-label="Coaching highlights">
      {[['01','Individual-first coaching'],['02','Science-informed methods'],['03','Consistent accountability'],['04','Built for real life']].map(([n, txt]) => <div className="trust-item" key={n}><span>{n}</span><p>{txt}</p></div>)}
    </section>

    <section className="section problem-section" id="programs"><div className="section-heading"><p className="eyebrow">{t.problem}</p><h2>{t.problemTitle}</h2><p className="section-sub">Progress should feel clear and purposeful.</p></div>
      <div className="problem-list">{['Generic workout plans that ignore your individual needs.','Crash diets that leave you hungry and frustrated.','No accountability, making it easy to give up.','Wasting money on supplements that do not deliver results.'].map((item, i) => <div className="problem-row" key={item}><span className="row-num">0{i+1}</span><span className="problem-x">×</span><p>{item}</p><ArrowDownRight className="row-arrow" size={20}/></div>)}</div>
      <p className="problem-close">You don’t need another cookie-cutter plan.<br/><span>You need a coach who builds around you.</span></p>
    </section>

      <section className="solution-section" id="about"><div className="solution-image"><div className="image-label"><span className="live-dot"/>COACHING, BUILT AROUND YOU</div><span className="image-serial">AH / 001</span></div><div className="solution-copy"><p className="eyebrow">{t.solution}</p><h2>{t.solutionTitle}</h2><p className="body-copy">{t.solutionText}</p><p className="body-copy muted">A science-informed approach, clear communication, and practical coaching that adapts as you progress.</p><div className="benefits">{['Custom training plan built around your goals','Personalized nutrition without starvation diets','Direct WhatsApp access to your coach','Weekly check-ins and plan adjustments'].map((v, i) => <div key={v}><span>0{i+1}</span><Check size={15}/>{v}</div>)}</div><a className="text-link" href="#coach">LEARN MORE ABOUT COACH AHMADANY <ArrowRight size={16}/></a></div></section>

    <section className="section process-section"><div className="section-heading"><p className="eyebrow">{t.process}</p><h2>{t.processTitle}</h2></div><div className="steps-grid">{steps.map(([n, title, description]) => <article className="step" key={n}><div className="step-top"><span>{n}</span><MoveUpRight size={17}/></div><h3>{title}</h3><p>{description}</p></article>)}</div></section>

    <section className="proof-band" id="proof"><div className="proof-image"/><div className="proof-overlay"/><div className="proof-content"><p className="eyebrow">{t.proof}</p><h2>{t.proofTitle}</h2><p>Real client progress photos, shared with permission.<br/>Every transformation tells a different story.</p><span className="placeholder-note">CLIENT PHOTOS TO BE ADDED WITH PERMISSION</span></div><div className="proof-frame">AUTHENTICITY OVER HYPE <span>— ALWAYS</span></div></section>

    <section className="messages-section"><div className="messages-heading"><div><p className="eyebrow">REAL MESSAGES</p><h2>NO SCRIPT.<br/>JUST REAL FEEDBACK.</h2></div><p>Messages from clients sharing their experience throughout the coaching process.</p></div><div className="message-placeholders"><div><span>01 / WHATSAPP FEEDBACK</span><strong>SCREENSHOT SLOT</strong><small>Genuine, redacted client message to be added with permission.</small></div><div><span>02 / WHATSAPP FEEDBACK</span><strong>SCREENSHOT SLOT</strong><small>Genuine, redacted client message to be added with permission.</small></div><div><span>03 / WHATSAPP FEEDBACK</span><strong>SCREENSHOT SLOT</strong><small>Genuine, redacted client message to be added with permission.</small></div></div><p className="permission-note">No client messages are displayed until authentic screenshots are supplied and personal details are redacted.</p></section>

    <section className="section stories-section" id="stories"><div className="section-heading stories-heading"><p className="eyebrow">{t.stories}</p><h2>{t.storiesTitle}</h2><a className="text-link" href={`${wa}?text=${encodeURIComponent('Hi Coach Ahmadany, I would like to see more client results and feedback.')}`} target="_blank" rel="noreferrer">ASK FOR MORE FEEDBACK <ArrowRight size={16}/></a></div><div className="testimonial-grid">{testimonials.map((item, i) => <article className="testimonial" key={item.name}><span className="quote-mark">“</span><p className={i === 0 || i === 1 || i === 3 ? 'quote arabic-quote' : 'quote'} lang={i === 0 || i === 1 || i === 3 ? 'ar' : 'en'}>{item.quote}</p><div className="testimonial-footer"><div><strong>{item.name}</strong><span>CLIENT STORY · SHARED WITH PERMISSION</span></div><small>{item.result}</small></div></article>)}</div><p className="permission-note">Client stories and reported outcomes are provided for review. Publish only after confirming permission and details.</p></section>

    <section className="pricing-section" id="pricing"><div className="pricing-top"><div><p className="eyebrow">{t.investment}</p><h2>{t.pricingTitle}</h2></div><p>{t.pricingText}<br/><span>30-day guarantee terms pending confirmation · One-time payment · No automatic renewal</span></p></div><div className="pricing-grid">{Object.values(plans).map((plan, i) => <article className={`price-card ${i === 1 ? 'price-card-featured' : ''}`} key={plan.id}>{i === 1 && <div className="popular">MOST POPULAR</div>}<div className="price-name"><span>0{i+1} / COACHING</span><h3>{plan.name}</h3></div><p className="price-description">{plan.description}</p><div className="price-amount"><strong>{plan.price.toLocaleString('en-US')}</strong><span>EGP <i>/ {plan.duration}</i></span></div><p className="billing">One-time payment for the full {plan.duration}</p><div className="plan-features">{plan.features.map(f => <p key={f}><Check size={15}/>{f}</p>)}</div><button className={`button ${i === 1 ? 'button-lime' : 'button-outline'}`} onClick={() => checkout(plan.id)}>GET STARTED <ArrowRight size={16}/></button><p className="card-footnote">Payment configuration pending · Total shown before payment</p></article>)}</div><p className="pricing-note">The supplied 30-day guarantee will be presented as an active offer only after its eligibility conditions and refund workflow are confirmed.</p></section>

    <section className="coach-section" id="coach"><div className="coach-art"><div className="coach-initials">MA<span>.</span></div><div className="coach-caption">COACH MOHAMED AHMEDANY<br/><span>PERSONALIZED · SCIENCE-INFORMED · HUMAN</span></div></div><div className="coach-copy"><p className="eyebrow">THE PERSON BEHIND THE PLAN</p><h2>{t.coach}</h2><p className="body-copy">I believe lasting progress comes from the right plan, honest communication, and showing up consistently. Coaching should fit your life — not ask you to put your life on hold.</p><p className="body-copy muted">We’ll build practical training and nutrition habits around your goals, then adjust as you progress. Expect clear guidance, regular check-ins, and accountability that keeps you moving.</p><a className="button button-ghost" href={wa} target="_blank" rel="noreferrer">MEET YOUR COACH <ArrowRight size={16}/></a></div></section>

    <section className="consult-section" id="contact"><div><p className="eyebrow">A GOOD FIRST STEP</p><h2>{t.contact}</h2><p>{t.contactText}</p><div className="contact-details"><a href="tel:+201011549171">+20 101 154 9171</a><a href="mailto:coachingahmdany@gmail.com">coachingahmdany@gmail.com</a></div></div><ConsultForm /></section>

    <section className="final-cta"><p className="eyebrow">YOUR NEXT CHAPTER STARTS HERE</p><h2>{t.final}</h2><p>Join the coaching community and take the next step toward your goals.</p><div className="hero-buttons"><a className="button button-lime" href="#pricing">START NOW <ArrowRight size={16}/></a><a className="button button-ghost" href="#contact">{t.book} <ArrowDownRight size={16}/></a></div><div className="final-orb"/></section>

    <footer className="footer"><div className="footer-top"><a className="wordmark" href="#home">AHMADANY<span>®</span></a><p>Building stronger bodies and minds since 2016.</p><a className="back-top" href="#home">BACK TO TOP <ArrowDown size={14}/></a></div><div className="footer-links"><div><span>EXPLORE</span><a href="#about">About</a><a href="#programs">Programs</a><a href="#stories">Results</a><a href="#pricing">Pricing</a><a href="#contact">Contact</a></div><div><span>COACHING</span><a href="#pricing">1-on-1 Online Coaching</a><a href="#pricing">Nutrition Coaching</a><a href="#pricing">Training Coaching</a><a href="#contact">Competition Prep · Enquire</a></div><div><span>CONTACT</span><a href="tel:+201011549171">+20 101 154 9171</a><a href="mailto:coachingahmdany@gmail.com">coachingahmdany@gmail.com</a><a href={wa} target="_blank" rel="noreferrer">WhatsApp ↗</a></div><div><span>INFORMATION</span><Link href="/terms">Terms and Conditions</Link><Link href="/privacy">Privacy Policy</Link><Link href="/refunds">Refund Policy</Link></div></div><div className="footer-bottom"><span>© 2026 AHMADANY. ALL RIGHTS RESERVED.</span><span>CAIRO, EGYPT · ONLINE WORLDWIDE</span><span>STOP GUESSING. START TRANSFORMING.</span></div></footer>
  </main>;
}

function ConsultForm() {
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);
  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setBusy(true); setMessage('');
    const form = new FormData(e.currentTarget);
    const name = String(form.get('name') || '').trim();
    const email = String(form.get('email') || '').trim();
    const phone = String(form.get('phone') || '').trim();
    const goal = String(form.get('goal') || '').trim();
    if (!name || !email.includes('@') || !phone || !goal) { setMessage('Please complete each required field with a valid email.'); setBusy(false); return; }
    const plan = String(form.get('plan') || 'Not sure yet');
    const text = `Hi Coach Ahmadany, my name is ${name}. Email: ${email}. WhatsApp: ${phone}. My main goal: ${goal}. Plan: ${plan}. ${String(form.get('note') || '')}`;
    window.open(`${wa}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
    setMessage('Your message is ready in WhatsApp. Send it there to reach your coach.'); setBusy(false); e.currentTarget.reset();
  }
  return <form className="consult-form" onSubmit={submit}><label>YOUR NAME<input name="name" autoComplete="name" required placeholder="Full name"/></label><div className="form-split"><label>EMAIL<input name="email" type="email" autoComplete="email" required placeholder="you@example.com"/></label><label>WHATSAPP<input name="phone" type="tel" autoComplete="tel" required placeholder="+20 ..."/></label></div><div className="form-split"><label>PRIMARY GOAL<input name="goal" required placeholder="Strength, fat loss, ..."/></label><label>PLAN INTERESTED IN<select name="plan" defaultValue=""><option value="">Help me choose</option><option>Weekly Follow-Up</option><option>Daily Follow-Up</option></select></label></div><label>OPTIONAL MESSAGE<textarea name="note" rows={2} placeholder="Anything else you'd like your coach to know?"/></label><button className="button button-lime" disabled={busy}>{busy ? 'PREPARING…' : 'SEND VIA WHATSAPP'} <ArrowRight size={16}/></button><p className="form-note" aria-live="polite">{message || 'Your details stay in this form until you choose to send them in WhatsApp.'}</p></form>;
}
