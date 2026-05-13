# Integration Guide — Human Connection Redesign
## optim-soln.com · Optimized Solutions

This document explains where each component lives and how they connect to the existing site.

---

## Deliverable Files

| File | Purpose |
|---|---|
| `public/social-proof-bar.html` | Standalone HTML component (preview/reference) |
| `public/founder-strip.html` | Standalone HTML component (preview/reference) |
| `public/about-page.html` | Standalone full About page (preview/reference) |

The standalone HTML files are accessible at `optim-soln.com/social-proof-bar.html` etc. for visual review.
They are **not** the live implementation — the Next.js files below are.

---

## Live Next.js Implementation

### Social Proof Bar + Founder Strip → Homepage

**File:** `app/enterprise-agile/page.js`
**Insertion point:** Between the `</section>` closing the hero and the `{/* ── CERTIFICATIONS ── */}` comment.

Order on page:
1. Hero ("Transformation Over Transition")
2. **Social Proof Bar** — inline JSX, no client component needed
3. **Founder Strip** — `<FounderStrip />` (client component, scroll animation)
4. Certifications section
5. … rest of page

**Client component:** `app/enterprise-agile/FounderStrip.jsx`
- Uses `useEffect` + `IntersectionObserver` for scroll fade-in
- Uses `next/image` for the founder photo (`/girijaa-photo.png`)
- No external dependencies

### About Page

**File:** `app/about/page.js`
**Route:** `/about`
**Nav link:** Already added to `components/GlobalHeader.jsx`

Sections in order:
1. **Hero** — parallax background photo, editorial headline
2. **Mission** — company narrative, warm prose
3. **Timeline** — 5 scroll-animated milestones (edit years/copy in `TIMELINE` array)
4. **Philosophy** — 3 pillar cards with SVG icons
5. **Founder** — photo + bio + credential chips
6. **CTA** — "Schedule a Conversation" + "View Certifications"

---

## Editing Content

All user-editable copy is in constant arrays at the top of each file:

- **Timeline entries:** `TIMELINE` array in `app/about/page.js`
- **Founder strip copy:** Inline in `app/enterprise-agile/FounderStrip.jsx` (body paragraph + headline)
- **Social proof stats:** Inline in the social proof bar JSX in `enterprise-agile/page.js`
- **Industry logos:** The `['Banking', 'Healthcare', ...]` array — replace text with `<img>` elements when real logos are available

---

## Colour Variables (site palette)

```
BG      = '#F7F6F2'   warm cream (main background)
BG_ALT  = '#EEF2EE'   soft sage tint (alternate sections)
BG_DARK = '#2D4A55'   deep teal (CTA, footer, dark sections)
BG_FND  = '#1A3832'   deep forest green (founder strip, hero)
BORDER  = '#C8C4BC'   warm grey border
TEXT    = '#111C20'   near-black body text
MUTED   = '#3D5A60'   dark teal secondary text
FAINT   = '#5A7880'   medium teal tertiary text
GOLD    = '#C9973A'   warm gold accent
SAGE    = '#2E7D52'   vivid green accent
```

---

## Photo Assets

| File | Usage |
|---|---|
| `public/girijaa-photo.png` | Founder portrait — used in hero, founder strip, and about page |

To use a wider editorial hero photo for the About page hero background, add the file to `public/` and update the `src` in the `<Image>` inside the hero section of `app/about/page.js`.

---

## Fonts

The standalone HTML files load **Fraunces** (display serif) and **Lora** (body serif) via Google Fonts CDN.

The Next.js site currently uses **Georgia** (system serif) and **DM Sans** (system sans) — no CDN dependency.
To add Fraunces to the Next.js site, add it to `app/layout.js` using `next/font/google`.
