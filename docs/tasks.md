# Project Tasks (Kanban Board)

This document serves as the central Kanban board for "The Contextual Architect" project. Move items between sections as progress is made.

## To Do

### Epic 1: The Content Layer (Core Portfolio)

#### [ ] Task 1.1: Project Setup & Infrastructure
- **Description**: Initialize the codebase, establish the project structure, and set up the deployment pipeline to ensure a stable environment.
- **Definition of Done**:
  - [ ] Next.js (App Router) project initialized with TypeScript.
  - [ ] Tailwind CSS configured with custom colors (Developer Brutalism theme).
  - [ ] `zod` installed for schema validation.
  - [ ] Dockerfile created and optimized.
  - [ ] "Hello World" application successfully deployed to Google Cloud Run.

#### [ ] Task 1.2: Data Modeling
- **Description**: Structure the static content of the portfolio by creating a scalable JSON schema.
- **Definition of Done**:
  - [ ] `profile.json` created and populated with real data (Skills, Experience, Projects, Achievements).
  - [ ] TypeScript interfaces defined for the profile schema.
  - [ ] Data validation tests (or script) ensuring `profile.json` matches the schema.

#### [ ] Task 1.3: UI Component Architecture
- **Description**: Build the visual building blocks (Cards, Sections) for the content layer.
- **Definition of Done**:
  - [ ] `SkillCard` component implemented and responsive.
  - [ ] `ProjectCard` component implemented and responsive.
  - [ ] `ExperienceCard` component implemented and responsive.
  - [ ] All components render data correctly from `profile.json`.

### Epic 2: The Context Layer (AI Integration)

#### [ ] Task 2.1: Hero Chat Interface
- **Description**: Build the "Context Layer" UI where users interact with the AI agent.
- **Definition of Done**:
  - [ ] Chat input interface created with "Developer Brutalism" styling.
  - [ ] Prompt template chips (e.g., "Recruiter", "Hiring Manager") implemented.
  - [ ] UI handles Loading, Error, and Success states visually.

#### [ ] Task 2.2: AI Backend & Prompting
- **Description**: Engineer the Gemini System Prompt and API route to return structured UI configurations.
- **Definition of Done**:
  - [ ] `/api/chat` route implemented using Gemini 1.5 Flash.
  - [ ] System prompt engineered to return JSON with `layout_order` and `highlight_ids`.
  - [ ] API keys secured in environment variables.
  - [ ] "Default Layout" fallback mechanism implemented for error cases.

#### [ ] Task 2.3: Reactive State Management
- **Description**: Connect the AI "Brain" to the portfolio "Body" using Zustand.
- **Definition of Done**:
  - [ ] Zustand store created to manage Layout State.
  - [ ] `SectionWrapper` components created to subscribe to layout changes.
  - [ ] Frontend correctly updates order and highlights based on mock store data.

### Epic 3: Visual Polish & Experience (UX)

#### [ ] Task 3.1: Dynamic Reordering Animation
- **Description**: Implement smooth animations when sections change position based on relevance.
- **Definition of Done**:
  - [ ] Framer Motion `layout` prop applied to section lists.
  - [ ] Reordering transitions are smooth (<300ms) and jank-free.

#### [ ] Task 3.2: Smart Highlighting
- **Description**: Visually emphasize items selected by the AI to guide the user's eye.
- **Definition of Done**:
  - [ ] "Glow" or "Border" styles implemented for highlighted items.
  - [ ] Highlighting logic correctly targets IDs returned by the AI.

#### [ ] Task 3.3: The "Unveiling" Transition
- **Description**: Create a seamless transition from the Hero Chat to the Portfolio content.
- **Definition of Done**:
  - [ ] Scroll-to-reveal or "peel away" animation implemented upon chat completion.
  - [ ] "Skip to Portfolio" button implemented for immediate access.

### Epic 4: Verification & Non-Functional Requirements

#### [ ] Task 4.1: Mobile & Responsive Verification
- **Description**: Ensure the site is fully functional and visually consistent across all device sizes.
- **Definition of Done**:
  - [ ] Layout verified on Mobile, Tablet, and Desktop breakpoints.
  - [ ] Touch targets are accessible on mobile.

#### [ ] Task 4.2: Performance & SEO
- **Description**: Optimize for search engines and performance metrics.
- **Definition of Done**:
  - [ ] Meta tags and Open Graph data configured.
  - [ ] Google Lighthouse Performance score of 90+.
  - [ ] Accessibility audit passed (WCAG 2.1 AA).

## In Progress
*(No tasks currently in progress)*

## Done
*(No tasks completed yet)*
