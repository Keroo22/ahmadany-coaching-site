import { ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function BrandPage({ eyebrow, title, intro, sections, action = '/#pricing', actionLabel = 'EXPLORE COACHING PLANS' }: { eyebrow: string; title: string; intro: string; sections: { title: string; body: string }[]; action?: string; actionLabel?: string }) {
  return <main className="legal-wrap"><article className="legal-content"><Link className="back-link" href="/"><ArrowLeft size={14}/> AHMADANY HOME</Link><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p>{intro}</p>{sections.map(s => <section key={s.title}><h2>{s.title}</h2><p>{s.body}</p></section>)}<Link className="button button-lime" href={action}>{actionLabel}<ArrowRight size={16}/></Link></article></main>;
}
