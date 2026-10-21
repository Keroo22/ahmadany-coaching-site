# AHMADANY — online coaching

Premium responsive Next.js site for Coach Mohamed Ahmedany.

## Public preview

The site is published with GitHub Pages at https://keroo22.github.io/ahmadany-coaching-site/ from the `main` branch. Pushes to `main` automatically rebuild and publish it through GitHub Actions.

The preview is a static marketing site. Payment and order creation are intentionally disabled; plan inquiries open WhatsApp. The site uses a black and red visual system, a plan-guidance chat widget, generic editorial gym photography, and draft policies until owner-approved assets and final copy are provided.

The chat widget currently answers common plan questions with a guided sales FAQ and offers a WhatsApp handoff. For model-powered AI answers, connect a secure backend that accepts `POST { "messages": [{ "role": "user|assistant", "content": "..." }] }` and returns `{ "reply": "..." }`. Set its HTTPS URL as the GitHub Actions secret `NEXT_PUBLIC_CHATBOT_ENDPOINT`, then rerun the deployment workflow. Keep provider API keys only on that backend; GitHub Pages cannot securely host server-side secrets or API routes. Add rate limits, allowed-origin checks, and a privacy notice before enabling an AI provider.

## Run locally

1. Install Node.js 20.9+.
2. Run `npm install`, then `npm run dev`.
3. Open `http://localhost:3000`.

For a local production build, run `npm run build`, then `npm start`.

## What is implemented

- Responsive home page with persistent English/Arabic selection, RTL direction, translated navigation and primary headings, and an Arabic checkout summary. Most lower-section marketing copy and the policy pages remain English and need professional Arabic translation and review before an Arabic launch.
- Dynamically loaded Three.js metallic hero orb on larger screens. The cinematic photo remains as the visual fallback; the WebGL orb is skipped for reduced-motion preferences and small screens.
- Plan selection and a dedicated static plan review. Payment is not collected and no order is created.
- Terms, privacy, and refund policy draft pages, plus sitemap and robots routes.
- Floating plan-guidance chat widget with a WhatsApp sales handoff; supports an optional secure AI backend endpoint.
- GitHub Actions workflow builds and deploys the static export to GitHub Pages.

## Production integrations still required

No merchant, database, email credentials, AI backend, production domain, or coach-supplied image/social assets were present in the project. Before accepting an order or enabling model-powered chat:

1. Confirm Egyptian merchant eligibility, accepted EGP payment methods, settlement, refunds, and current gateway documentation with Paymob or another eligible provider.
2. Implement provider tokenization/payment initiation, signed webhook verification, idempotent event handling, server-side order persistence, status reconciliation, and refund handling. Add database migrations and transactional email after choosing providers. Never accept a browser redirect as payment proof or store card data.
3. Set secrets only in the deployment environment. `.env.example` lists placeholders; do not commit credentials.
4. Confirm the 30-day guarantee conditions and approve the draft legal policies before advertising the guarantee or accepting payments. Arrange legal review for Arabic and English policy text.
5. Confirm the supplied testimonials, identity display, outcomes, and publication consent. Supply authentic coach portrait, authorized client transformation images, and redacted genuine WhatsApp feedback. Current fitness imagery is generic editorial gym photography, not client proof; the proof section is explicitly a placeholder.
6. Provide official social URLs and a production domain to complete social profiles, canonical metadata, and production Open Graph details.
7. For AI sales chat, deploy a backend endpoint that uses a server-side model key, limits requests and output, avoids collecting health data, and clearly hands medical or injury questions to the coach or a qualified professional.

## Asset checklist

- Coach portrait and written biography confirmed by Mohamed Ahmedany.
- Authorized client before/after pairs, client names/initial preferences, and verified result captions.
- Genuine, redacted WhatsApp feedback screenshots and accessibility descriptions.
- Confirmed review ratings/statistics if the business wants numerical claims published.
- Official social profile URLs and production domain.

## Routes

- `/` — home and coaching conversion experience
- `/about`, `/programs`, `/pricing`, `/contact` — dedicated information pages
- `/checkout?plan=weekly` or `/checkout?plan=daily` — plan review (payment disabled)
- `/terms`, `/privacy`, `/refunds` — draft policy pages requiring business review

The English/Arabic switch controls the home experience and preserves language in checkout links. Policy drafts are currently English only; they must be professionally translated and reviewed before an Arabic launch.
