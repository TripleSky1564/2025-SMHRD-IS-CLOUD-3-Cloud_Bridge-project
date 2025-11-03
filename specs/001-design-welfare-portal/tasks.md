---

description: "Task list for Public Welfare Service Assistant Portal implementation"
---

# Tasks: Public Welfare Service Assistant Portal

**Input**: Design documents from `/specs/001-design-welfare-portal/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Include targeted React Testing Library and accessibility checks where they add confidence for each user story.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and baseline tooling

- [X] T001 Scaffold Vite + React + TypeScript workspace under `frontend/` per implementation plan
- [X] T002 Add React Router 6, React Testing Library, and pnpm scripts in `frontend/package.json`
- [X] T003 Configure ESLint (with jsx-a11y) and Prettier in `frontend/.eslintrc.cjs` and `frontend/.prettierrc`
- [X] T004 [P] Establish design tokens and global styles in `frontend/src/styles/tokens.ts` and `frontend/src/styles/global.css`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core structure and shared assets required by all stories

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T005 Initialize router shell and app bootstrap in `frontend/src/main.tsx` and `frontend/src/App.tsx`
- [X] T006 Build shared layout primitives (Header, Footer, Grid) in `frontend/src/layout/`
- [X] T007 Define ServiceGuidance domain types in `frontend/src/types/guidance.ts`
- [X] T008 Create static content fixtures for services, documents, and categories in `frontend/src/data/serviceGuidance.ts`
- [X] T009 Implement guidance search and selectors in `frontend/src/utils/guidanceSearch.ts`
- [X] T010 Prepare Home and Service Detail page shells in `frontend/src/pages/Home/HomePage.tsx` and `frontend/src/pages/ServiceDetail/ServiceDetailPage.tsx`

**Checkpoint**: Foundation ready — user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Chatbot-Guided Complaint Preparation (Priority: P1) 🎯 MVP

**Goal**: Deliver chatbot-driven guidance that splits online and offline steps with document requirements.

**Independent Test**: From the landing page, entering a known service query returns service summary plus channel-specific steps and document checklist without needing other navigation.

### Implementation & Tests for User Story 1

- [X] T011 [P] [US1] Add chatbot search experience test in `frontend/tests/pages/HomePage.chatbot.test.tsx`
- [X] T012 [US1] Implement chatbot input and prompt helper in `frontend/src/components/chatbot/ChatbotInput.tsx`
- [X] T013 [US1] Render chatbot guidance results with online/offline sections in `frontend/src/components/chatbot/ChatbotGuidance.tsx`
- [X] T014 [US1] Connect chatbot state to guidance search on the home page in `frontend/src/pages/Home/HomePage.tsx`
- [X] T015 [US1] Style chatbot panel with accessible sky-blue treatment in `frontend/src/pages/Home/HomePage.module.css`

**Checkpoint**: User Story 1 functional and testable independently.

---

## Phase 4: User Story 2 - Explore Services by Life Situation (Priority: P2)

**Goal**: Provide category-based browsing that links to detailed guidance without using the chatbot.

**Independent Test**: Selecting a life-event category reveals service cards, and choosing a service opens detail guidance mirroring chatbot output.

### Implementation & Tests for User Story 2

- [X] T016 [P] [US2] Implement category grid and cards in `frontend/src/components/category/CategoryGrid.tsx`
- [X] T017 [US2] Build service summary card list component in `frontend/src/components/service/ServiceSummaryCard.tsx`
- [X] T018 [US2] Integrate category navigation section into Home page layout in `frontend/src/pages/Home/HomePage.tsx`
- [X] T019 [US2] Complete service detail content (summary, steps, documents, support) in `frontend/src/pages/ServiceDetail/ServiceDetailPage.tsx`
- [X] T020 [P] [US2] Add navigation flow test covering category-to-detail journey in `frontend/tests/pages/HomePage.navigation.test.tsx`

**Checkpoint**: User Stories 1 and 2 both work independently.

---

## Phase 5: User Story 3 - Accessible Public-Facing Experience (Priority: P3)

**Goal**: Ensure accessibility controls and keyboard-friendly styling meet civic usability expectations.

**Independent Test**: Visitors can toggle text size and high-contrast modes, move through all interactive elements via keyboard, and optionally trigger an audio summary cue.

### Implementation & Tests for User Story 3

- [X] T021 [P] [US3] Implement accessibility controls (text size, contrast) in `frontend/src/components/accessibility/AccessibilityControls.tsx`
- [X] T022 [US3] Apply accessibility state and landmarks to layout in `frontend/src/layout/AppLayout.tsx`
- [X] T023 [US3] Update global styles for focus outlines and responsive typography in `frontend/src/styles/global.css`
- [X] T024 [P] [US3] Add accessibility regression test with jest-axe in `frontend/tests/accessibility/a11y.test.tsx`
- [X] T025 [US3] Provide audio summary trigger component in `frontend/src/components/accessibility/AudioSummaryButton.tsx`

**Checkpoint**: All user stories independently satisfy acceptance criteria.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Repository documentation, QA artifacts, and launch readiness

- [X] T026 Document runbook and UI overview in `frontend/README.md`
- [X] T027 [P] Capture edge-case QA notes (vague queries, offline-only services) in `frontend/docs/qa-notes.md`
- [X] T028 [P] Record lint/test/Lighthouse verification results in `frontend/docs/verification.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 Setup** → prerequisite for all other phases.
- **Phase 2 Foundational** → depends on Phase 1; blocks all user stories.
- **Phases 3–5 (User Stories)** → start after Phase 2; can run in parallel per story if staffed.
- **Phase 6 Polish** → begins after desired user stories reach their checkpoints.

### User Story Dependencies

- **User Story 1 (P1)**: First deliverable; no dependency on other stories once foundation is ready.
- **User Story 2 (P2)**: Depends on shared data/types from foundation; reuses components from US1 but remains independently testable.
- **User Story 3 (P3)**: Depends on layout and components from earlier phases; accessibility enhancements overlay existing journeys.

### Within Each User Story

1. Write/adjust targeted tests.
2. Build supporting components.
3. Integrate into pages/routes.
4. Apply styling and accessibility updates.
5. Run story-specific verification before moving on.

---

## Parallel Execution Opportunities

- After T001 completes, T002–T004 can progress concurrently.
- Within Phase 2, tasks T006–T009 touch distinct directories and can run in parallel once routing shell (T005) is in place.
- User story test tasks (T011, T020, T024) can execute alongside component implementation.
- Different user stories (Phases 3–5) may proceed simultaneously after foundational work, provided shared files are coordinated.
- Polish tasks T027 and T028 can run concurrently after documentation task T026 sets context.

---

## Implementation Strategy

1. **MVP First (US1)**: Deliver chatbot-guided guidance with accurate document checklists to satisfy the core value proposition.
2. **Expand Navigation (US2)**: Introduce life-event browsing to accommodate users who prefer structured discovery.
3. **Accessibility Enhancements (US3)**: Layer in adaptive controls and compliance checks to meet civic inclusivity expectations.
4. **Polish & Verification**: Finalize documentation, QA records, and verification evidence before handoff.
