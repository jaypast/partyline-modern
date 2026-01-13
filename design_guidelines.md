# PartyLine Modern - Design Guidelines

## Design Theme: "Midnight Jazz"

**Vibe:** Sophisticated late-night radio, smooth jazz DJ, intimate conversation
**Era Inspiration:** 90s late-night call-in shows, warm and inviting

**Core Aesthetic:**
- Deep, rich colors that feel like a late-night radio studio
- Elegant serif headlines that command attention
- Warm gold accents that feel luxurious but approachable
- Burgundy primary color that's bold without being aggressive

---

## Color Palette

### Primary Colors
- **Deep Burgundy** `#8B0A50` (HSL: 328 85% 35%) - Main brand color, buttons, links
- **Rich Gold** `#FFD700` (HSL: 51 90% 50%) - Secondary actions, highlights, badges
- **Soft Teal** `#5F9EA0` (HSL: 182 25% 50%) - Accents, success states, online indicators

### Background Colors
- **Light Mode:** Soft lavender-gray `#F5F5FA` - Clean but not sterile
- **Dark Mode:** Deep charcoal `#1A1A2E` - Like a cozy radio studio at night

### Text Colors
- **Foreground:** Warm off-white in dark mode, deep charcoal in light mode
- **Muted:** Softer grays for secondary text
- **Gold accents** for emphasis and highlights

---

## Typography

**Headline Font:** Playfair Display (elegant serif)
- Used for H1, H2, H3 headings
- Creates sophistication and gravitas
- Feels like classic radio show branding

**Body Font:** Inter (clean sans-serif)
- Highly legible at all sizes
- Professional and modern
- Critical for 40-75 age demographic readability

**Type Scale:**
- Hero/H1: 3xl to 5xl (48-60px desktop)
- H2: 2xl to 4xl (36-48px)
- H3: xl to 2xl (24-36px)
- Body: lg to xl (18-20px base) - Critical for readability
- Small: base (16px minimum)
- Buttons/CTAs: lg to xl, medium to semibold weight

---

## Tone of Voice

**Think:** Late-night jazz radio DJ—warm, smooth, genuine, never corporate

**Do:**
- Use conversational, friendly language
- Speak directly to the listener ("You deserve..." not "Users can...")
- Keep it warm and inviting
- Acknowledge loneliness without being patronizing

**Don't:**
- Sound like a tech startup
- Use cold, corporate language
- Over-explain or be preachy
- Use excessive exclamation marks

**Example Phrases:**
- "Ready when you are" instead of "Get Started Now!"
- "Let's talk" instead of "Contact Us"
- "Find your voice" instead of "Browse our companion network"
- "Every conversation matters" instead of "Quality interactions guaranteed"

---

## Layout System

**Spacing Primitives:** Tailwind units of 4, 6, 8, 12, 16, 20 (consistent rhythm)

**Container Strategy:**
- Marketing pages: max-w-7xl with px-6 to px-12
- App interface: max-w-6xl
- Forms and focused content: max-w-2xl

**Grid Patterns:**
- Companion profiles: 2-3 columns on desktop, stack mobile
- Feature sections: 3 columns max, 2 preferred for this audience
- Pricing tiers: side-by-side comparison, stack on mobile

---

## Component Styling

### Buttons
- **Primary:** Burgundy background, white text—bold but elegant
- **Secondary:** Gold background, dark text—for alternate actions
- **Outline:** Burgundy or teal border—for tertiary actions
- **Ghost:** Transparent with hover state—for navigation

### Cards
- Subtle border in light mode
- Slightly elevated background in dark mode
- Rounded corners (rounded-xl)
- Generous padding

### Badges & Tags
- Gold for premium/featured items
- Teal for online/available status
- Muted backgrounds for interest tags

### Navigation
- Sticky header with clear sections
- Large touch targets (min h-16)
- Prominent CTAs with burgundy primary button
- Logo/brand name in Playfair Display

---

## Page Structures

### Landing Page Sections:
1. Hero with compelling headline and warm imagery
2. How It Works (3-step process with icons)
3. Why PartyLine (benefits grid)
4. Companion Showcase (featured profiles)
5. Safety & Trust (icon grid)
6. Pricing (comparison table)
7. Testimonials (quotes with photos)
8. Final CTA (centered, inviting)

### Companion Marketplace:
- Filter sidebar (availability, interests, price range, language)
- Grid of companion cards with gold highlights for featured
- Burgundy "Call Now" buttons

---

## Accessibility

- Minimum text: 16px (18px preferred for body)
- Touch targets: 48x48px minimum
- Color contrast: WCAG AA minimum (prefer AAA for text)
- Focus indicators: thick, high-contrast borders
- Skip navigation links
- ARIA labels for icon-only buttons
- Form validation with clear error states

---

## Interaction Notes

- Minimal animations (subtle fades, gentle hover states)
- Loading states: pulsing indicator with "Connecting..." text
- Success confirmations: teal checkmark + message
- Hover states should feel luxurious, not jarring
