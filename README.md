# Happy Voyager

**Engineer your freedom.** A visa guidance platform by [Abie Maxey](https://www.instagram.com/abiemaxey/) ~ helping digital nomads navigate Spain's visa system without a lawyer.

## What is this?

Happy Voyager is a content + product platform that guides people through Spain's Digital Nomad Visa (DNV) process from start to finish. The flagship product is the **Spain DNV Playbook Pro** ~ a 24-lesson, 6-phase interactive course covering everything from eligibility to Spanish citizenship.

### Key features

- **Playbook Pro** ~ structured course with 24 lessons across 6 phases (Qualify, Prepare, Apply, Arrive, Maintain, Become Spanish)
- **Free Reference Guides** ~ 6 standalone guides covering visa basics, eligibility, document checklists, and more
- **AI Guide** ~ Gemini-powered chatbot trained on all playbook content for instant answers
- **Eligibility Assessment** ~ interactive tool to check DNV qualification in 2 minutes
- **Schengen Calculator** ~ day-counting tool for the 90/180 Schengen rule
- **Progress Tracking** ~ lesson completion with localStorage persistence
- **Light/Dark Theme** ~ full adaptive theming with CSS custom properties
- **Playbook Ecosystem** ~ 6 interconnected playbooks (1 available, 5 on waitlist) forming a journey from Schengen visa to EU passport
- **Stripe Payments** ~ gated premium content with email-based access
- **Waitlist System** ~ early access signup for upcoming playbooks

## Tech Stack

| Layer         | Tech                                                         |
| ------------- | ------------------------------------------------------------ |
| Framework     | [Next.js 15](https://nextjs.org/) (App Router)              |
| Language      | TypeScript                                                   |
| Styling       | [Tailwind CSS v4](https://tailwindcss.com/) + CSS custom properties |
| Animation     | [Motion](https://motion.dev/) (Framer Motion v12)           |
| Icons         | [@tabler/icons-react](https://tabler.io/icons) + [Lucide](https://lucide.dev/) |
| AI            | [Vercel AI SDK](https://sdk.vercel.ai/) + Google Gemini     |
| Database      | [Supabase](https://supabase.com/) (auth, progress, waitlist)|
| Payments      | [Stripe](https://stripe.com/) (checkout + webhooks)         |
| Email         | [Resend](https://resend.com/)                               |
| Images        | Cloudinary CDN + Next.js Image                              |
| Fonts         | Avenir (CDN) + Allura (Google Fonts)                        |
| Hosting       | [Vercel](https://vercel.com/)                               |

## Getting Started

### 1. Clone and install

```bash
git clone https://github.com/abiegamao/happyvoyager.git
cd happyvoyager
npm install
```

### 2. Set up environment variables

Create `.env.local` with:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Stripe
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
STRIPE_PRICE_SPAIN_DNV=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=

# AI
GEMINI_API_KEY=

# Email
RESEND_API_KEY=
```

### 3. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Project Structure

```
app/
  (blog)/           Blog posts
  (how-to)/         How-to guides (document checklist, NIE/TIE, bank accounts)
  (legal)/          Privacy policy, terms of service
  (marketing)/      Landing pages (booking, appointments, playbook-pro)
  (tools)/          Interactive tools (assessment, Schengen calculator)
  (visa-info)/      Visa information pages (DNV, NLV, student, Schengen)
  api/              API routes (chat, payments, progress, webhooks)
  playbook/
    page.tsx        Playbook catalog (all playbooks)
    spain-dnv/      Spain DNV Playbook Pro
      home/         Playbook home (roadmap, journey, connected playbooks)
      lessons/      24 lesson pages
      guides/       6 free reference guides
      progress/     Progress tracking dashboard
      faqs-and-tips/ FAQs and tips page

components/
  playbook/         Playbook-specific components (AI chatbot, search, topbar)
  ui/               Shared UI components (AnimateIn, calendar, popover)

data/
  playbooks/        Playbook configs and content (spain-dnv, waitlist playbooks)

docs/
  brand-guide.html  Visual branding guideline (open in browser)
  branding-guideline.md  Full brand spec (markdown)

lib/                Supabase admin client
public/assets/      Logo, images, static assets
```

## Design System

The site uses a warm, earthy palette inspired by Mediterranean light:

| Color        | Hex       | Role              |
| ------------ | --------- | ----------------- |
| Cream        | `#f9f5f2` | Background        |
| Charcoal     | `#3a3a3a` | Text              |
| Dusty Rose   | `#e3a99c` | Primary accent    |
| Warm Beige   | `#e7ddd3` | Borders           |
| Sage         | `#8fa38d` | Free content      |
| Gold         | `#c9a84c` | Premium/CTA       |

Full brand guidelines: [`docs/brand-guide.html`](docs/brand-guide.html)

## Playbook Ecosystem

The platform features an interconnected system of playbooks:

| # | Playbook              | Status    | Accent    |
| - | --------------------- | --------- | --------- |
| 0 | Schengen First        | Waitlist  | `#bbcccd` |
| 1 | **Spain DNV Pro**     | Available | `#e3a99c` |
| 2 | Soft Landing          | Waitlist  | `#c47c5a` |
| 3 | Spanish Passport      | Waitlist  | `#c9a84c` |
| ~ | Visa Runner           | Waitlist  | `#6b8cba` |
| ~ | DELE A2               | Waitlist  | `#c4523a` |

## Content Conventions

- Use `~` instead of em dashes (`---`) in all copy
- Tone: warm, direct, encouraging ~ like a knowledgeable friend
- Avoid stock photography ~ keep imagery personal and travel-authentic
- Always test both light and dark themes

## Author

**Abie Maxey (Abz)** ~ systems engineer, content creator, and DNV holder based in Spain.

- [Instagram](https://www.instagram.com/abiemaxey/)
- [YouTube](https://www.youtube.com/@abiemaxey)
- [LinkedIn](https://www.linkedin.com/in/abiemaxey/)
- hello@abiemaxey.com
