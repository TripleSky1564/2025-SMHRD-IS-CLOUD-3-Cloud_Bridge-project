# Research Log: Public Welfare Service Assistant Portal

## Decision 1: Component Styling Solution
- **Decision**: Adopt CSS Modules with shared design tokens managed via a central `styles/tokens.ts` file.
- **Rationale**: CSS Modules keep styles scoped and generate static class names, supporting strong performance for a static React build. Tokens file enables consistent application of the sky-blue civic palette and typography without incurring runtime theming overhead. Works seamlessly with Vite/CRA defaults and simplifies onboarding for government content teams.
- **Alternatives Considered**:
  - `styled-components`: Powerful theming but adds runtime cost and requires Babel configuration; unnecessary for initial static layouts.
  - Tailwind CSS: Accelerates development but introduces utility-heavy markup that may hinder content updates by non-developers.

## Decision 2: Accessibility & Layout Best Practices
- **Decision**: Follow WCAG 2.1 AA-aligned patterns—landmark roles, semantic headings, keyboard trap prevention, and minimum 4.5:1 contrast—implemented via React ARIA attributes and linting.
- **Rationale**: Aligns with public-sector compliance requirements while leveraging native HTML semantics first. Keeps implementation technology-agnostic and compatible with screen readers common in Korean government facilities.
- **Alternatives Considered**:
  - Heavy reliance on third-party accessibility frameworks: increases complexity without guaranteeing compliance.
  - Minimal manual accessibility effort: risks failing mandatory audits and undermines usability for key demographics.

## Decision 3: Navigation & Routing
- **Decision**: Use React Router 6 with route-based code organization (`/` for Home, `/services/:slug` for detail), while keeping data static for this phase.
- **Rationale**: Route grouping matches the spec’s two primary user journeys (landing and service detail). Enables future expansion to additional pages without restructuring, and integrates well with static hosting.
- **Alternatives Considered**:
  - Next.js routing: Overkill for a layout-only prototype; adds SSR considerations the team does not yet need.
  - Single-page anchor navigation: Limits deep-linking to specific service guidance and makes future growth harder.
