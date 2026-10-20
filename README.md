# AHMADANY — online coaching

Premium responsive Next.js site for Coach Mohamed Ahmedany.

## Run locally

1. Install Node.js 20.9+.
2. Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SITE_URL` for the local or production URL.
3. Run `npm install`, then `npm run dev`.
4. Open `http://localhost:3000`.

Production build: `npm run build`, then `npm start`.

## What is implemented

- Responsive home page with persistent English/Arabic selection, RTL direction, translated navigation and primary headings, and an Arabic checkout summary. Most lower-section marketing copy and the policy pages remain English and need professional Arabic translation and review before an Arabic launch.
- Dynamically loaded Three.js metallic hero orb on larger screens. The cinematic photo remains as the visual fallback; the WebGL orb is skipped for reduced-motion preferences and small screens.
- Plan selection and a dedicated checkout summary with server-side input and plan validation.
- Terms, privacy, and refund policy draft pages, plus sitemap and robots routes.
- Checkout fails closed. The API does not create an order, accept payment, or claim success. It returns an explicit not-configured response until payment, database, and provider callback handling have been implemented.

## Production integrations still required

No merchant, database, email credentials, production domain, or coach-supplied image/social assets were present in the project. Do not represent checkout as live. Before accepting an order:

1. Confirm Egyptian merchant eligibility, accepted EGP payment methods, settlement, refunds, and current gateway documentation with Paymob or another eligible provider.
2. Implement provider tokenization/payment initiation, signed webhook verification, idempotent event handling, server-side order persistence, status reconciliation, and refund handling. Add database migrations and transactional email after choosing providers. Never accept a browser redirect as payment proof or store card data.
3. Set secrets only in the deployment environment. `.env.example` lists placeholders; do not commit credentials.
4. Confirm the 30-day guarantee conditions and approve the draft legal policies before advertising the guarantee or accepting payments. Arrange legal review for Arabic and English policy text.
5. Confirm the supplied testimonials, identity display, outcomes, and publication consent. Supply authentic coach portrait, authorized client transformation images, and redacted genuine WhatsApp feedback. Current fitness imagery is generic editorial gym photography, not client proof; the proof section is explicitly a placeholder.
6. Provide official social URLs and production domain to complete social profiles, canonical metadata, and production Open Graph details.

## Asset checklist

- Coach portrait and written biography confirmed by Mohamed Ahmedany.
- Authorized client before/after pairs, client names/initial preferences, and verified result captions.
- Genuine, redacted WhatsApp feedback screenshots and accessibility descriptions.
- Confirmed review ratings/statistics if the business wants numerical claims published.
- Official social profile URLs and production domain.

## Routes

- `/` — home and coaching conversion experience
- `/about`, `/programs`, `/pricing`, `/contact` — dedicated information pages
- `/checkout?plan=weekly` or `/checkout?plan=daily` — plan review (payment disabled until integration)
- `/terms`, `/privacy`, `/refunds` — draft policy pages requiring business review

The English/Arabic switch controls the home experience and preserves language in checkout links. Policy drafts are currently English only; they must be professionally translated and reviewed before an Arabic launch.
