---
name: Upstage Professional
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#474651'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#777682'
  outline-variant: '#c8c5d3'
  surface-tint: '#5654a8'
  primary: '#1a146b'
  on-primary: '#ffffff'
  primary-container: '#312e81'
  on-primary-container: '#9c9af4'
  inverse-primary: '#c3c0ff'
  secondary: '#505f76'
  on-secondary: '#ffffff'
  secondary-container: '#d0e1fb'
  on-secondary-container: '#54647a'
  tertiary: '#1c2437'
  on-tertiary: '#ffffff'
  tertiary-container: '#31394e'
  on-tertiary-container: '#9ba3bc'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e2dfff'
  primary-fixed-dim: '#c3c0ff'
  on-primary-fixed: '#100563'
  on-primary-fixed-variant: '#3e3c8f'
  secondary-fixed: '#d3e4fe'
  secondary-fixed-dim: '#b7c8e1'
  on-secondary-fixed: '#0b1c30'
  on-secondary-fixed-variant: '#38485d'
  tertiary-fixed: '#dae2fd'
  tertiary-fixed-dim: '#bec6e0'
  on-tertiary-fixed: '#131b2e'
  on-tertiary-fixed-variant: '#3f465c'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  display:
    fontFamily: Hanken Grotesk
    fontSize: 36px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 28px
    fontWeight: '600'
    lineHeight: '1.3'
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 20px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  body-sm:
    fontFamily: Hanken Grotesk
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  label-md:
    fontFamily: Hanken Grotesk
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Hanken Grotesk
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1'
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  container-max: 1280px
  gutter: 24px
---

## Brand & Style

The design system for this platform is built on the principles of **Calm Productivity** and **Academic Rigor**. Unlike typical "AI" platforms that lean into neon glows and cosmic metaphors, this system prioritizes the user's psychological state during high-pressure interview preparation. 

The aesthetic is **Modern Minimalist**, utilizing generous whitespace, disciplined color application, and sharp geometric precision. It evokes the feeling of a high-end physical workspace—clean, organized, and focused. The goal is to reduce cognitive load, allowing the candidate to focus entirely on their performance rather than the interface.

- **Minimalism:** Elements exist only if they serve a functional purpose.
- **Precision:** Alignment and spacing follow a strict mathematical rhythm.
- **Reliability:** The UI feels stable and predictable, building trust in the AI's feedback.

## Colors

The color palette is anchored by a deep, restrained **Indigo (#312e81)**. This color is used exclusively for primary actions, active navigation states, and critical focus indicators. 

The background uses a soft **Off-white (#f8fafc)** to reduce screen glare during long study sessions, while surfaces—such as cards and navigation bars—use pure **White (#ffffff)** to create clear containment. 

Text hierarchy is strictly enforced:
- **Primary Text (#1e293b):** Deep charcoal for maximum legibility.
- **Secondary Text (#64748b):** Muted slate for metadata, labels, and secondary information.
- **Borders (#e2e8f0):** Subtle, low-contrast lines that define structure without adding visual noise.

## Typography

This design system utilizes **Hanken Grotesk** across all roles to ensure a unified, contemporary feel. Its sharp geometry reflects the precision of the AI backend while remaining highly legible for long-form feedback transcripts.

The typographic scale is intentionally compact. We avoid oversized "marketing" headlines in favor of clear, informative titles. 
- **Body Text:** Set at 16px for optimal readability.
- **Line Height:** Relaxed (1.5 - 1.6) for body text to improve scanning speed.
- **Weight:** Regular (400) for content, Semibold (600) for structural emphasis, and Bold (700) sparingly for page titles.

## Layout & Spacing

The layout follows a **Fluid Grid** model with a maximum container width of 1280px to prevent line lengths from becoming unreadable on ultra-wide monitors.

A strict **4px baseline grid** governs all spatial relationships. 
- **Margins:** 24px on desktop, scaling down to 16px on mobile.
- **Gutters:** Standardized at 24px to provide ample "breathing room" between functional blocks.
- **Vertical Rhythm:** Components are separated by increments of 16px (md) or 24px (lg) to maintain a clear hierarchy of information.

The interface should feel "airy" but efficient. Group related elements (like an interview question and its timer) with small gaps (8px), while separating major sections (like the video feed and the transcript) with larger gaps (24px+).

## Elevation & Depth

To maintain a "flat and functional" aesthetic, this design system avoids heavy shadows and complex gradients. Depth is communicated primarily through **Tonal Layering** and **Subtle Outlines**.

1. **Level 0 (Background):** The base canvas (#f8fafc).
2. **Level 1 (Surfaces):** Cards and main content containers (#ffffff) with a 1px solid border (#e2e8f0).
3. **Level 2 (Interaction):** Only when an element is active or being dragged, a very soft, diffused shadow is applied (0px 4px 12px rgba(0, 0, 0, 0.05)).

This approach ensures that the "AI" does not feel like a mysterious black box, but rather a transparent, accessible tool.

## Shapes

The shape language is **Disciplined and Soft**. We use a baseline corner radius of **4px (0.25rem)** for most components, providing a professional edge that isn't as aggressive as sharp 0px corners.

- **Buttons & Inputs:** 4px radius.
- **Cards & Modals:** 8px (rounded-lg) to provide a slightly softer container for large amounts of data.
- **Feedback Tags/Chips:** Fully rounded (pill) to distinguish them from actionable buttons.

## Components

### Buttons
- **Primary:** Background #312e81, Text #ffffff. No shadow. 4px radius.
- **Secondary:** Background transparent, Border 1px #e2e8f0, Text #1e293b.
- **State:** On hover, primary darkens slightly; secondary gains a faint #f1f5f9 background.

### Input Fields
- **Default:** White background, 1px #e2e8f0 border, 16px horizontal padding.
- **Focus:** 1px #312e81 border with a 2px semi-transparent indigo ring. This is critical for accessibility during keyboard-only navigation.

### Cards
- White background, 1px #e2e8f0 border. No shadow. Use for interview modules, performance metrics, and history items.

### Chips & Badges
- Used for "Skills" or "Topic Tags." 
- Small text, pill-shaped, using muted tints of the status colors (e.g., Success is #ecfdf5 background with #065f46 text).

### Interview Progress Bar
- A thin 4px track (#e2e8f0) with a #312e81 fill. Minimalist, placed at the top of the interview interface to show progress without distraction.

### AI Feedback Blocks
- Distinguished by a very light indigo tint (#f5f3ff) background to subtly separate human input from AI-generated insights.