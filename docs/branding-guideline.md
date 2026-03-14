# Happy Voyager ~ Brand Guidelines

> **"Engineer your freedom."**

---

## 1. Brand Identity

### Who We Are

Happy Voyager is a visa guidance platform built by **Abie Maxey (Abz)** ~ a systems engineer, content creator, and DNV holder who moved to Spain completely DIY. No lawyer. No agency. Just a system she built, documented, and now gives to others.

### Brand Promise

We turn the visa process from overwhelming bureaucracy into a clear, step-by-step system anyone can follow.

### Tagline

**Freedom Engineer** ~ displayed in dusty rose, uppercase, wide letter-spacing.

### Core Messaging

- "Get Spain's Digital Nomad Visa Without Paying a Lawyer"
- "I turned a passport that felt like a cage into a boarding pass to Europe."
- "No lawyer. No agency. Just a system I built, and now I'm giving it to you."

### Trust Signals

- Visa approved 2026
- €0 in lawyer fees
- 3-year EU residency
- Active nomad in Spain

---

## 2. Color Palette

### Primary Colors

| Name          | Hex       | Usage                                       |
| ------------- | --------- | ------------------------------------------- |
| Cream         | `#f9f5f2` | Primary background                          |
| Charcoal      | `#3a3a3a` | Primary text, dark surfaces                 |
| Dusty Rose    | `#e3a99c` | Primary accent, CTAs, highlights, scrollbar |
| Warm Beige    | `#e7ddd3` | Secondary background, borders               |
| Soft Peach    | `#f2d6c9` | Muted accent, badge backgrounds             |

### Secondary Colors

| Name          | Hex       | Usage                                     |
| ------------- | --------- | ----------------------------------------- |
| Sage          | `#8fa38d` | Free content badges, nature accents       |
| Slate         | `#bbcccd` | Tertiary accent, tool category tags       |
| Gold          | `#c9a84c` | Premium/final CTA gradients, achievements |
| Dark Rose     | `#d69586` | Hover states for dusty rose               |

### Playbook-Specific Accents

Each playbook has its own accent + background pair:

| Playbook          | Accent    | Background |
| ----------------- | --------- | ---------- |
| Spain DNV         | `#e3a99c` | `#f2d6c9`  |
| Schengen First    | `#bbcccd` | `#dde8e9`  |
| Visa Runner       | `#6b8cba` | `#dde8f5`  |
| Soft Landing      | `#c47c5a` | `#f5e6dc`  |
| DELE A2           | `#c4523a` | `#f5ddd7`  |
| Spanish Passport  | `#c9a84c` | `#f5ecd7`  |

### Utility Colors

| Name             | Hex       | Usage                             |
| ---------------- | --------- | --------------------------------- |
| Medium Gray      | `#6b6b6b` | Secondary text                    |
| Light Gray       | `#aaaaaa` | Labels, muted text                |
| Off-White        | `#f0ebe6` | Dividers, subtle borders          |
| Dark Background  | `#2a2a2a` | Dark mode surface, footer         |
| Selection BG     | `#d8afa1` | Text selection highlight          |

### Tag/Badge Colors

| Category  | Background | Text      |
| --------- | ---------- | --------- |
| Tool      | `#d4e0d3`  | `#5d7a5b` |
| Core      | `#f2d6c9`  | `#c47a6a` |
| Tax       | `#f5ecd7`  | `#9a7a3a` |
| Updated   | `#e0eaeb`  | `#4a7070` |
| Shortcut  | `#f2d6c9`  | `#e3a99c` |
| Free      | `#d4e0d3`  | `#8fa38d` |
| Default   | `#f0ebe6`  | `#7a7a7a` |

---

## 3. Typography

### Font Stack

| Role    | Family                                       | Weight  | Usage                                  |
| ------- | -------------------------------------------- | ------- | -------------------------------------- |
| Heading | Avenir, Avenir Next, system-ui, sans-serif   | 600~800 | All headings, bold UI elements         |
| Body    | Avenir, Avenir Next, system-ui, sans-serif   | 400~500 | Body text, descriptions, labels        |
| Script  | Allura (Google Fonts)                        | 400     | Decorative accents, stylised keywords  |

### Font Sources

- **Avenir**: `https://fonts.cdnfonts.com/css/avenir`
- **Allura**: Google Fonts via `next/font/google`

### Type Scale (Playbook)

| Element           | Size       | Weight    | Notes                                     |
| ----------------- | ---------- | --------- | ----------------------------------------- |
| Page title (h1)   | 40px       | Bold      | Tight tracking, script font for accents   |
| Section heading   | 28px       | Bold      | Script accents at 32px                    |
| Card title        | 18px       | Bold      | --                                        |
| Subtitle          | 15px       | Medium    | Secondary color                           |
| Body text         | 14~15px    | Regular   | 1.6 line-height                           |
| Small label       | 11~12px    | Bold      | Uppercase, wide tracking                  |
| Micro text        | 9~10px     | Bold      | Badges, status indicators                 |

### Script Font Usage

The script font (Allura) is used sparingly for branded accent words:
- "Playbook **Pro**"
- "Your **Roadmap**"
- "The **Journey**"
- Often styled with the dusty rose color and a slightly larger size than surrounding text.

---

## 4. Logo

### Files

- **Primary**: `/public/assets/logo.png` (572x151px PNG)
- **Variant**: `/public/assets/abie-logo.png`

### Usage Rules

- Default: Full-color on cream/light backgrounds
- Dark mode: Apply `filter: brightness(0) invert(1)` for white version
- Minimum height: 28px (`h-7`), typical: 36~48px
- Always maintain clear space around the logo

### Brand Mark

The logo includes the airplane motif above "HAPPY **VOYAGER**" with "FREEDOM ENGINEER" as a secondary tagline beneath.

---

## 5. Imagery & Photography

### Style

- **Warm, travel-inspired** ~ maps, Spanish architecture, sunny landscapes
- **Personal** ~ founder photos, authentic moments (not stock)
- **Muted earth tones** to match the cream/rose/beige palette

### Image Treatment

- Hero images: Rounded corners (`rounded-2xl` to `rounded-[100px]`), subtle shadow
- Background images: Low opacity (0.03~0.1), sometimes grayscale
- Avatar: Circular crop with 2px solid border using `--pb-border`

### Hosting

- Product images: Cloudinary CDN (`res.cloudinary.com/dg1i3ew9w/`)
- Static assets: `/public/assets/`

---

## 6. Design Patterns

### Glassmorphism

The signature visual style uses frosted-glass surfaces:

| Class                | Background               | Blur  | Usage                 |
| -------------------- | ------------------------ | ----- | --------------------- |
| `.glass`             | rgba(255,255,255,0.7)    | 10px  | General cards         |
| `.glass-pb`          | var(--pb-surface)        | 20px  | Playbook cards        |
| `.glass-pb-elevated` | var(--pb-surface-elevated) | 24px | Prominent playbook cards |

### Border Radius

| Context          | Radius                  |
| ---------------- | ----------------------- |
| Base             | 10px (`0.625rem`)       |
| Buttons/pills    | `rounded-full` (9999px) |
| Cards            | `rounded-xl` ~ `rounded-2xl` (12~16px) |
| Hero images      | `rounded-[60px]` ~ `rounded-[100px]` |
| Input fields     | `rounded-xl` (12px)     |

### Shadows

| Context        | Value                                          |
| -------------- | ---------------------------------------------- |
| Card hover     | `0 20px 40px rgba(58,58,58,0.1)`               |
| Primary button | `0 4px 15px rgba(227,169,156,0.4)`             |
| Button hover   | `0 8px 25px rgba(227,169,156,0.5)`             |
| Card base      | `0 8px 32px var(--pb-shadow)`                  |
| Accent shadow  | `0 25px 50px -12px var(--pb-shadow-accent)`    |

### Gradients

| Name           | Value                                            | Usage              |
| -------------- | ------------------------------------------------ | ------------------- |
| Primary        | `135deg, #f2d6c9 → #e3a99c`                     | CTAs, highlights    |
| Button         | `135deg, #e3a99c → #d69586`                      | Primary buttons     |
| CTA Banner     | `135deg, #e3a99c → #c9a84c`                      | Final CTA sections  |
| Sage           | `135deg, #bbcccd → #a8bfc0`                      | Tool/free elements  |
| Warm           | `180deg, #f9f5f2 → #e7ddd3`                      | Page backgrounds    |
| Hero           | `180deg, #f9f5f2 → #f2d6c9 → #e7ddd3`           | Hero sections       |
| Timeline       | `180deg, #e3a99c → #8fa38d → #c9a84c → #e3a99c` | Roadmap line        |

### Ambient Blobs

Soft, blurred colour blobs provide depth in backgrounds:
- Rose blob: `rgba(227,169,156,0.12)` with 80~120px blur
- Sage blob: `rgba(143,163,141,0.10)` with similar blur
- Peach blob: `rgba(242,214,201,0.08)`
- Positioned absolutely, z-index 0, non-interactive

### Noise Texture

A subtle SVG turbulence overlay at 0.03 opacity adds a premium paper-like texture to surfaces.

---

## 7. Component Patterns

### Buttons

| Variant     | Style                                                        |
| ----------- | ------------------------------------------------------------ |
| Primary     | Gradient rose bg, white text, rounded-full, shadow, font-600 |
| Secondary   | Transparent, rose border, charcoal text, rounded-full        |
| Ghost       | Text-only link with hover colour shift to dusty rose         |
| CTA (large) | Gradient rose→gold, white text, rounded-xl, shadow-lg        |

### Cards

- White/glass surface with subtle border (`var(--pb-border)`)
- Accent colour strip at top (0.5px ~ 2px height)
- Rounded-2xl corners
- Hover: lift -8px + shadow elevation
- Content: emoji/icon + title + description + metadata row

### Badges / Pills

- Rounded-full shape
- Font size 9~11px, bold, uppercase, wide tracking
- Colour-coded by category (see tag colours above)
- Padding: `px-2 py-0.5` (small) to `px-2.5 py-1` (medium)

### Navigation

- Topbar: 48px height, glass background, horizontal pills with active state
- Active tab: pill background with subtle border, spring animation (layoutId)
- Sidebar: 260px width, glass background, nested tree structure

### Modals / Overlays

- Semi-transparent overlay: 40% opacity (light) / 60% (dark)
- Backdrop blur
- Content panel: glass surface, rounded-2xl~3xl
- Spring animation on entry (scale 0.97 → 1, opacity 0 → 1)

---

## 8. Animation Language

### Principles

- **Subtle and purposeful** ~ animations enhance, never distract
- **Performance-first** ~ prefer CSS transitions; use motion/react for complex sequences
- **Scroll-triggered** ~ elements animate in as they enter the viewport

### Key Animations

| Name            | Type           | Duration | Usage                        |
| --------------- | -------------- | -------- | ---------------------------- |
| Fade in         | opacity        | 0.8~1s   | General reveal               |
| Slide up        | translateY+opacity | 0.8s | Section entry                |
| Scale in        | scale+opacity  | 0.6s     | Modal entry                  |
| Float           | translateY+rotate | 6~7s  | Decorative elements          |
| Pulse soft      | opacity+scale  | 4s       | Ambient indicators           |
| Staggered entry | varies         | 0.5s per item | Lists, grids, timelines |
| Spring hover    | scale          | spring(400,20) | Interactive elements    |
| Gradient shift  | background-position | 8s  | Decorative backgrounds       |

### Motion Framework

- Library: `motion/react` (Framer Motion v12)
- `whileInView` for scroll-triggered animations
- `whileHover` for interactive spring effects
- `AnimatePresence` for mount/unmount transitions
- `layoutId` for shared layout animations (tab switching)

### Easing

- Default: `[0.25, 0.46, 0.45, 0.94]` (smooth ease-out)
- Spring: `stiffness: 400~500, damping: 20~35`
- Timing: `cubic-bezier(0.4, 0, 0.2, 1)` for CSS transitions

---

## 9. Dark Mode

The playbook supports full light/dark theming via CSS custom properties scoped to `[data-playbook]`.

### Key Differences

| Token          | Light              | Dark                    |
| -------------- | ------------------ | ----------------------- |
| Background     | `#f9f5f2` (cream)  | `#2a2a2a` (charcoal)    |
| Surface        | white @ 70%        | white @ 4%              |
| Text           | `#3a3a3a`          | white @ 90%             |
| Text secondary | charcoal @ 60%     | white @ 50%             |
| Text muted     | charcoal @ 35%     | white @ 30%             |
| Border         | black @ 8%         | white @ 8%              |
| Shadow         | black @ 8%         | black @ 15%             |
| Blobs          | 8~12% opacity      | 5~8% opacity            |

### Rules

- Brand accent colours (`#e3a99c`, `#8fa38d`, `#c9a84c`) stay the same in both themes
- Logo inverts to white in dark mode via CSS filter
- Glass surfaces shift from white-tinted to white-at-low-opacity
- Default theme is **light**; user preference stored in `localStorage("playbook_theme")`

---

## 10. Tone of Voice

### Personality

- **Warm and direct** ~ like a knowledgeable friend, not a legal bot
- **Encouraging** ~ "You can do this" energy throughout
- **Honest** ~ acknowledges complexity, doesn't oversimplify
- **Personal** ~ first-person where natural ("When I submitted mine...")

### Writing Rules

- Use `~` instead of `—` (em dash) in all content
- Keep it concise ~ no fluff, no filler
- Plain language first; explain Spanish terms (NIE, TIE, UGE) briefly when used
- Favour active voice and direct instructions

### Messaging Hierarchy

1. **Headline**: Bold, benefit-driven, often with script accent word
2. **Subhead**: One-line clarifying context
3. **Body**: Practical, specific, scannable
4. **CTA**: Action-oriented with arrow (→)

---

## 11. Iconography

### Libraries

- **Tabler Icons** (`@tabler/icons-react`) ~ primary icon set for UI elements
- **Lucide React** (`lucide-react`) ~ supplementary icons
- Stroke width: 2 (consistent across all icons)
- Size: 16px (w-4 h-4) for inline, 18px for cards, 20px for features

### Phase Icons (Playbook Roadmap)

| Phase          | Icon              |
| -------------- | ----------------- |
| Qualify        | IconTarget        |
| Prepare        | IconClipboardList |
| Apply          | IconFileText      |
| Arrive         | IconPlane         |
| Maintain       | IconRefresh       |
| Become Spanish | IconTrophy        |

---

## 12. Social & Contact

| Channel    | URL                                          |
| ---------- | -------------------------------------------- |
| Instagram  | https://www.instagram.com/abiemaxey/         |
| Threads    | https://www.threads.net/@abiemaxey           |
| LinkedIn   | https://www.linkedin.com/in/abiemaxey/       |
| YouTube    | https://www.youtube.com/@abiemaxey           |
| Email      | hello@abiemaxey.com                          |
| Website    | https://happyvoyager.com                     |

---

## 13. Layout & Spacing

### Container Widths

| Context     | Max Width     |
| ----------- | ------------- |
| Site-wide   | 80rem (1280px) |
| Playbook    | 1400px        |
| Content     | 840px         |

### Section Padding

| Breakpoint | Vertical | Horizontal |
| ---------- | -------- | ---------- |
| Mobile     | 6rem     | 1.5rem     |
| Tablet     | 8rem     | 2rem       |
| Desktop    | 10rem    | 4rem       |

### Header Heights

| Element       | Height |
| ------------- | ------ |
| Main header   | 56px   |
| Playbook topbar | 48px |
| Playbook sidebar | 260px wide |

### Z-Index Stack

| Layer       | z-index |
| ----------- | ------- |
| Header      | 50      |
| Topbar      | 40      |
| Sidebar     | 40 (mobile) / 0 (desktop) |
| Modals      | 50      |
| Blobs       | 0       |

---

## 14. Quick Reference ~ Do's and Don'ts

### Do

- Use the warm, earthy palette consistently
- Apply glassmorphism for surface depth
- Keep animations subtle and scroll-triggered
- Write in a warm, direct tone
- Use `~` instead of `—`
- Show the founder's personal journey as social proof

### Don't

- Use pure white (`#ffffff`) as a page background ~ use cream (`#f9f5f2`)
- Use pure black (`#000000`) for text ~ use charcoal (`#3a3a3a`)
- Overload with animations ~ one or two per viewport
- Use stock photography ~ keep imagery personal and travel-authentic
- Use formal/legal language ~ keep it human
- Mix icon libraries within the same component
