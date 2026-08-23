# UPSTAGE — UI/UX & Design System

## 1. DESIGN PHILOSOPHY

The visual design source is the approved Stitch prototype. Our platform embodies the following principles:

### Calm Productivity
The interface should help users focus on interview practice without unnecessary distractions. It provides a clean, professional environment for high-stakes preparation.

### Academic Rigor
Information such as scores, feedback, and reports should be presented clearly and objectively, ensuring the candidate trusts the AI evaluation.

### Modern Minimalism
Avoid unnecessary decoration. Elements exist only if they serve a functional purpose.

### Clarity Over Decoration
UI hierarchy should be obvious, guiding the user's eye to the most critical actions and information first.

### Functionality Over Effects
Animations and visual effects should support usability (e.g., loading states, active states) rather than purely aesthetic flair.

### Consistency
The same component should look and behave consistently across the application, reducing cognitive load.

---

## 2. COLOR SYSTEM

### Brand Colors
- **Primary:** `#312e81`
- **Primary Hover:** *(IMPLEMENTATION VARIANT — TO BE DERIVED FROM PRIMARY)*
- **Primary Active:** *(IMPLEMENTATION VARIANT — TO BE DERIVED FROM PRIMARY)*
- **Primary Light:** *(IMPLEMENTATION VARIANT — TO BE DERIVED FROM PRIMARY)*

### Neutral Colors
- **Background:** `#f7f9fb`
- **Surface:** `#ffffff`
- **Border:** `#e2e8f0`
- **Primary Text:** `#1e293b`
- **Secondary Text:** `#64748b`
- **Muted Text:** *(IMPLEMENTATION VARIANT — TO BE DERIVED FROM SECONDARY)*

### Semantic Colors
- **Success:** *(IMPLEMENTATION-LEVEL TOKEN — MUST REMAIN VISUALLY RESTRAINED)*
- **Warning:** *(IMPLEMENTATION-LEVEL TOKEN — MUST REMAIN VISUALLY RESTRAINED)*
- **Error:** *(IMPLEMENTATION-LEVEL TOKEN — MUST REMAIN VISUALLY RESTRAINED)*
- **Info:** *(IMPLEMENTATION-LEVEL TOKEN — MUST REMAIN VISUALLY RESTRAINED)*

---

## 3. TYPOGRAPHY SYSTEM

**Font Family:** Hanken Grotesk

- **Display / Hero:** 36px, Bold (700), Line Height 1.2
- **Page Heading:** 28px, Semibold (600), Line Height 1.3
- **Section Heading:** 20px, Semibold (600), Line Height 1.4
- **Card Heading:** 18px, Regular/Semibold, Line Height 1.6
- **Body:** 16px, Regular (400), Line Height 1.5 - 1.6
- **Small Text:** 14px, Regular (400), Line Height 1.5
- **Caption:** 12px, Medium (500), Line Height 1
- **Button Text:** 16px, Semibold, Line Height 1
- **Form Label:** 14px, Semibold (600), Line Height 1

---

## 4. SPACING SYSTEM

Using a 4px baseline system.

- **4, 8:** Small internal spacing (e.g., between an icon and text, inside buttons).
- **12, 16:** Form and control spacing (e.g., padding inside inputs, space between input and label).
- **20, 24:** Section and card spacing (e.g., padding inside a standard card, gap between grid items).
- **32, 40, 48:** Major layout spacing (e.g., separating distinct sections of a page).
- **64:** Page-level spacing (e.g., margins at the top and bottom of a layout container).

---

## 5. CONTAINER & GRID

- **Maximum width:** `1280px`
- **Desktop gutters:** `24px`
- **Mobile gutters:** `16px`

**Definitions:**
- **Page Container:** Centers content and caps width at 1280px.
- **Content Area:** The main working space of the application.
- **Sidebar Width Concept:** Fixed width on desktop (e.g., 250px-300px), collapsible on mobile/tablet.
- **Main Content Area:** Flexes to fill the remaining space beside the sidebar.
- **Card Grid:** Uses CSS Grid with responsive columns (1 on mobile, 2-3 on tablet, 3-4 on desktop).

---

## 6. BORDER & RADIUS SYSTEM

- **Default border:** `1px solid #e2e8f0`
- **Input:** 4px radius (`rounded`)
- **Button:** 4px radius (`rounded`)
- **Card:** 8px radius (`rounded-lg`)
- **Modal:** 8px radius (`rounded-lg`)
- **Badge:** Full radius (`rounded-full`)

---

## 7. ELEVATION / SHADOW SYSTEM

Normal cards rely primarily on background, border, and spacing. Heavy shadows are avoided.

**Allowed shadows:**
- Interactive overlays
- Dropdowns
- Modals
- Floating elements

---

## 8. BUTTON SYSTEM

- **Primary Button:** Main call-to-action. Background `#312e81`, text white. Hover darkens slightly.
- **Secondary Button:** Alternative action. Transparent background, border `#e2e8f0`, text `#1e293b`. Hover gains a faint background.
- **Outline Button:** Less prominent secondary action. Outlined.
- **Ghost Button:** Text only, used for tertiary actions like "Cancel".
- **Danger Button:** For destructive actions (e.g., Delete User). Red background/text.
- **Disabled Button:** Lower opacity, non-interactive.
- **Loading Button:** Displays a spinner, prevents multiple clicks.

---

## 9. FORM SYSTEM

- **Inputs (Text, Password, Select, Textarea, File, Checkbox, Radio):** 
  - Standardized height and 4px radius. 
  - White background, 1px `#e2e8f0` border.
- **Label Placement:** Above the input field.
- **Focus State:** 1px `#312e81` border, potentially with a subtle focus ring.
- **Error State:** Red border, error text displayed below input.
- **Disabled State:** Muted colors, non-interactive.
- **Helper/Error Text:** Small text (12-14px) displayed below the field.

---

## 10. CARD SYSTEM

- **Basic Card:** White background, 8px radius, 1px `#e2e8f0` border. Standard padding (24px).
- **Stat Card:** Contains a large number and label.
- **Interview Card:** Displays domain, date, status, and action button.
- **Report Card:** Displays score breakdown or overview.
- **Feedback Card:** Subtly tinted background for AI feedback.
- **Admin Card:** Specialized for admin data views.

---

## 11. NAVIGATION SYSTEM

### Public Navigation
- Landing page navigation (Logo, Login, Signup).

### Candidate Navigation
- Dashboard
- Interviews
- History
- Progress
- Profile

### Admin Navigation
- Dashboard
- Users
- Questions
- Analytics

**States:**
- **Active:** Distinct text color or subtle background highlight.
- **Hover:** Slight background change.
- **Collapsed (Sidebar):** Icons only.
- **Mobile:** Hamburger menu expanding into a drawer or bottom nav.
- **User Menu:** Dropdown for profile settings and logout.

---

## 12. TABLE SYSTEM

Used for Interview History, Admin Users, Question Bank, Analytics.

- **Header:** Distinct weight/color from rows.
- **Row:** Clear division lines (`#e2e8f0`).
- **Hover:** Subtle background change on row hover.
- **Status Badge:** Visual indicator of state.
- **Action Area:** Right-aligned buttons/icons (View, Edit, Delete).
- **Empty State:** Spans all columns, simple message.
- **Loading State:** Skeleton rows.
- **Mobile Behaviour:** Tables should become stacked cards on narrow screens to preserve readability.

---

## 13. BADGE SYSTEM

Keep badges subtle and pill-shaped (full radius).

- **Difficulty:** Easy, Medium, Hard
- **Status:** Completed, In Progress, Pending, Failed
- **Role:** Candidate, Admin

---

## 14. INTERVIEW UI DESIGN RULES

The Interview Room is the core experience. The question should remain the visual focus. Do not overcrowd the interface.

- **Question Hierarchy:** Prominent question text.
- **Question Number:** Clearly indicates progression (e.g., "Question 2 of 5").
- **Progress Indicator:** Minimalist top progress bar.
- **Timer:** Unobtrusive countdown or elapsed time.
- **Answer Area:** Clean textarea or audio visualizer.
- **Text/Voice Switch:** Easy toggle between input methods.
- **Submit Action:** Clear "Submit Answer" primary button.
- **Next/Exit Actions:** Secondary/Ghost buttons.

**States:**
- Normal State
- Recording State (Visual indicator of active microphone)
- Processing State (Spinner for transcription)
- Submitted State
- Error State
- Final Question State (Button changes to "Submit Interview")

---

## 15. REPORT UI DESIGN RULES

The report should feel like a professional evaluation document, without excessive charts.

- **Overall Score:** Prominent display using a ScoreCard.
- **Score Breakdown:** Individual metrics.
- **Question Evaluation:** List of questions and specific feedback.
- **Strengths / Weaknesses:** Highlighted in dedicated sections.
- **Improvement Suggestions:** Actionable next steps.
- **Components Used:** ScoreCard, ProgressBar, FeedbackBlock, StrengthSection, WeaknessSection.

---

## 16. DASHBOARD DESIGN RULES

Avoid excessive widgets. The "Start New Interview" action should be easy to find.

**Hierarchy:**
1. Header
2. Welcome / Primary Action
3. Quick Statistics
4. Recent Interviews
5. Progress Snapshot

---

## 17. EMPTY STATES

Empty states should contain a simple visual indicator, a short explanation, and a useful next action. Do not use giant illustrations.

**Examples:**
- No interview history
- No search results
- No reports
- No admin data

---

## 18. LOADING STATES

Do not overuse animations. Prefer skeletons for content and spinners for actions.

- **Page Loading:** Initial app load.
- **Section Loading:** Skeletons for cards or tables.
- **Button Loading:** Spinner inside the button.
- **AI Generation Loading:** Clear processing indicator for prompt preparation.
- **Resume Upload Loading:** Progress bar or spinner.
- **Report Loading:** Skeleton structure of the report layout.

---

## 19. ERROR STATES

Do not expose technical stack traces to users. Use clear messages and recovery actions.

- **Form Error:** Field-level validation.
- **API Error:** Toast or banner.
- **AI Error:** Graceful fallback or retry prompt.
- **Upload Error:** Try again prompt.
- **Authentication/Unauthorized Error:** Redirect or clear message.
- **Network Error:** Offline indicator.

---

## 20. TOAST / NOTIFICATION SYSTEM

Use toasts for non-blocking information. Do NOT use them for critical information requiring user action.

- Successful actions (e.g., "Profile updated").
- Short-lived warnings.
- Non-blocking errors.

---

## 21. MODAL SYSTEM

Use primarily for important short decisions or disruptive confirmations. Avoid modal overload.

- Exit interview confirmation.
- Destructive/admin confirmation (e.g., Delete user).

---

## 22. RESPONSIVE DESIGN

Follow Tailwind responsive conventions.

- **Desktop:** `1024px+`
- **Tablet:** `768px - 1023px`
- **Mobile:** `below 768px`

**Component Adaptations:**
- **Navbar/Sidebar:** Hamburger menu on mobile.
- **Dashboard Grids:** Stack into 1 column on mobile.
- **Interview Room:** Ensure textarea/audio controls fit on small screens without scrolling.
- **Report:** Side-by-side breakdowns stack vertically.
- **Tables:** Convert to card lists on mobile.
- **Forms:** Full width on mobile.

---

## 23. ACCESSIBILITY

Do not over-engineer, but meet minimum standards:
- Readable contrast.
- Visible focus state (keyboard navigation).
- Proper labels for inputs.
- Meaningful button text (no "Click Here").
- Accessible form errors.
- Sufficient touch target sizes on mobile (44px min).
- No color-only information.

---

## 24. INTERACTION RULES

- **Hover:** Subtle visual feedback (background tint).
- **Focus:** Clear focus indicator ring.
- **Click:** Immediate visual feedback.
- **Loading:** Disable duplicate submission.
- **Success:** Show confirmation (toast).
- **Error:** Show recovery option.
- **Navigation:** Do not create confusing transitions.

---

## 25. ANIMATION RULES

Keep animation minimal. The interface should still feel responsive without animation.

**Allowed:**
- Subtle hover transitions (colors, borders).
- Button state transitions.
- Sidebar transitions.
- Modal fade/slide.
- Progress bar fills.
- Skeleton/loading animations.

**Avoid:**
- Large page animations.
- Excessive parallax.
- Flashy AI effects.
- Distracting motion.

---

## 26. PAGE-BY-PAGE UI SPECIFICATION

1. **Landing:**
   - Layout: Public. Purpose: Marketing. Primary CTA: "Get Started/Signup". Responsive: Stacked sections on mobile.
2. **Login:**
   - Layout: Auth. Purpose: Authentication. Primary CTA: "Log In". Responsive: Full width form.
3. **Signup:**
   - Layout: Auth. Purpose: Account creation. Primary CTA: "Sign Up". Responsive: Full width form.
4. **Forgot Password:**
   - Layout: Auth. Purpose: Recovery request. Primary CTA: "Send Link".
5. **Reset Password:**
   - Layout: Auth. Purpose: New password entry. Primary CTA: "Update Password".
6. **Candidate Dashboard:**
   - Layout: Candidate. Purpose: Hub. Primary CTA: "Start Interview". Main components: StatCards, InterviewCards.
7. **Interview Setup:**
   - Layout: Candidate. Purpose: Configure session. Primary CTA: "Next/Upload".
8. **Resume Upload/Preview:**
   - Layout: Candidate. Purpose: Context provision. Primary CTA: "Start Interview".
9. **Interview Room:**
   - Layout: Candidate (Minimal). Purpose: Session. Primary CTA: "Submit Answer". Important states: Recording, Loading.
10. **Interview Completion:**
    - Layout: Candidate. Purpose: Loading/Processing report.
11. **Performance Report:**
    - Layout: Candidate. Purpose: Review. Primary CTA: "Back to Dashboard" / "Review History".
12. **Interview History:**
    - Layout: Candidate. Purpose: Past sessions. Main components: Table or Grid of InterviewCards.
13. **Progress:**
    - Layout: Candidate. Purpose: Analytics. Main components: ProgressCards/Charts.
14. **Profile/Settings:**
    - Layout: Candidate. Purpose: Account management.
15. **Admin Dashboard:**
    - Layout: Admin. Purpose: Overview. Primary CTA: N/A.
16. **Admin User Management:**
    - Layout: Admin. Purpose: Control users. Main components: DataTable, Search.
17. **Admin Question Bank:**
    - Layout: Admin. Purpose: Manage prompts. Main components: DataTable, Filters.
18. **Admin Analytics:**
    - Layout: Admin. Purpose: Platform health. Main components: StatCards.

---

## 27. DESIGN TOKEN IMPLEMENTATION PLAN

Implementation of design tokens will happen during the frontend development phase. The preferred approach is to configure `tailwind.config.js` with the defined colors, typography, and spacing values, mapping them to standard Tailwind classes (e.g., `bg-primary`, `text-surface`, `font-hanken`). Exact overrides will be set without changing Tailwind's core syntax approach.

---

## 28. COMPONENT IMPLEMENTATION RULES

- Components should have one clear responsibility.
- Avoid giant components (split into smaller parts).
- Use props for reusable variations (e.g., `variant="primary"`).
- Avoid unnecessary prop drilling (use context or Zustand where appropriate).
- Keep API calls outside purely presentational components.
- Keep business logic outside purely visual components.
- Use descriptive names.
- Keep code beginner-friendly.

---

## 29. STITCH IMPLEMENTATION RULE

The final application should reproduce the approved Stitch design language. 
**However, DO NOT copy the generated Stitch HTML prototype blindly.** 
Rebuild the UI cleanly using React, Tailwind CSS, and reusable components. The Stitch HTML serves as a visual reference, not the final architecture.

---

## 30. DESIGN CONSISTENCY CHECKLIST

- [ ] Color system defined
- [ ] Typography defined
- [ ] Spacing defined
- [ ] Layout defined
- [ ] Buttons defined
- [ ] Forms defined
- [ ] Cards defined
- [ ] Navigation defined
- [ ] Tables defined
- [ ] Badges defined
- [ ] Interview UI defined
- [ ] Report UI defined
- [ ] Dashboard UI defined
- [ ] Empty states defined
- [ ] Loading states defined
- [ ] Error states defined
- [ ] Toasts defined
- [ ] Modals defined
- [ ] Responsive behaviour defined
- [ ] Accessibility defined
- [ ] Interaction rules defined
- [ ] Animation rules defined
- [ ] All major pages specified
- [ ] Stitch implementation rules defined
