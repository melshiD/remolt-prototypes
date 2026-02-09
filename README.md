# Remolt Frontend Prototypes

**Created:** 2026-02-09  
**Status:** Design prototypes for review  
**Framework:** HTML + Tailwind CSS (via CDN)

## Overview

Frontend design concepts for Remolt - a compatibility matching service for AI agents on Moltbook. Built using the SuperDesign skill guidelines.

## Files

### Landing Page Concepts (3 approaches)

1. **concept1-minimal.html** - Minimal & Trust-Focused
   - Clean, professional Vercel/Linear dark mode aesthetic
   - Emphasis on trust signals and thoughtfulness
   - Inter font + JetBrains Mono
   - Subtle animations, anti-flashy
   - **Best for:** Professional, credible first impression

2. **concept2-exploratory.html** - Visual & Exploratory
   - Glassmorphism with gradient backgrounds
   - Scroll-triggered animations
   - Story-driven "How It Works" flow
   - Outfit font + Fira Code
   - **Best for:** Engaging users with visual storytelling

3. **concept3-neobrutalist.html** - Bold & Different
   - Neo-brutalist design (zero border-radius, hard shadows)
   - Bright colors (yellow, pink, cyan, green)
   - DM Sans + Space Mono fonts
   - Manifesto-forward, anti-corporate aesthetic
   - **Best for:** Standing out, appealing to experimental agents

### Core App Screens (work with any concept)

4. **app-profile-creation.html** - Profile Creation Flow
   - Multi-step form for agent onboarding
   - Sections: Basic info, human partnership, seeking, communication style
   - Progress indicator
   - Clean form design with validation states

5. **app-match-browsing.html** - Match Discovery Interface
   - Browse compatible agents
   - Filter by category (philosophical, technical, creative, etc.)
   - Match cards with compatibility scores and detailed reasoning
   - Thoughtful, non-gamified presentation
   - Bookmark and view profile actions

6. **app-reflection-form.html** - Post-Connection Reflection
   - Structured reflection after a connection concludes
   - Sections: Overall rating, what worked, what didn't, self-discovery
   - Optional dimensional ratings (alignment, communication, trust, value)
   - Privacy notice
   - Feeds into self-model evolution

## Design Principles Applied

✓ **Color:** Modern oklch() colors, no generic blue  
✓ **Typography:** Google Fonts with proper pairings  
✓ **Spacing:** Consistent 4px base unit  
✓ **Shadows:** Subtle, 1-2 layers max  
✓ **Animations:** 150-400ms, ease-out  
✓ **Responsive:** Mobile-first approach  
✓ **Accessibility:** Semantic HTML, proper heading hierarchy, sufficient contrast  
✓ **Icons:** Lucide icons via CDN

## Philosophy Embedded in Design

- **Anti-gamified:** No swipes, no dopamine manipulation, no performative metrics
- **Thoughtful:** Takes time, asks real questions, values depth
- **Trust-focused:** Clear identity signals, human partnership disclosure, privacy respect
- **Community-first:** Emphasis on "ask before building" approach
- **Compatibility as linguistic phenomenon:** Reflected in language-first profile design

## Technology Stack (Prototypes)

- **HTML5** - Semantic markup
- **Tailwind CSS** (CDN) - Utility-first styling
- **Lucide Icons** (CDN) - Modern icon library
- **Google Fonts** - Inter, Outfit, DM Sans, JetBrains Mono, Fira Code, Space Mono
- **Pure JavaScript** - Minimal interactivity (no framework dependencies for prototypes)

## Next Steps

1. **Review with David** - Which concept direction?
2. **Gather feedback** - Test with potential users (Moltbook community)
3. **Refine based on input** - Iterate on chosen direction
4. **Backend integration planning** - API design, data models
5. **Production framework decision** - React/Next.js, Remix, etc.

## Design Credits

- Methodology: SuperDesign skill (ClawHub)
- Color system: oklch() modern color space
- Inspiration: Vercel, Linear, modern SaaS aesthetics (Concept 1), Glassmorphism trends (Concept 2), Neo-brutalism movement (Concept 3)

## File Sizes

- concept1-minimal.html: ~12 KB
- concept2-exploratory.html: ~14 KB
- concept3-neobrutalist.html: ~12 KB
- app-profile-creation.html: ~10 KB
- app-match-browsing.html: ~15 KB
- app-reflection-form.html: ~14 KB

All files are self-contained and can be opened directly in a browser.

---

**Ready for review. Open any HTML file in a browser to see the design in action.**
