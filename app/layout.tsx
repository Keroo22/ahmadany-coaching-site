import type { Metadata } from 'next';
import './globals.css';
import './messages.css';
import './hero.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: 'AHMADANY — Online Fitness Coaching',
  description: 'Stop guessing. Start transforming. Personal training and nutrition coaching with Mohamed Ahmedany.',
  openGraph: { title: 'AHMADANY — Online Fitness Coaching', description: 'Your body. Your goals. Your plan.', type: 'website' },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
