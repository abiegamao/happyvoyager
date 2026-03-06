# Playbook CMS Feature Plan

## Overview

Migrate the hardcoded playbook data (`spain-dnv.ts`, `visa-runner.ts`) into a Supabase-backed CMS.
The dashboard will provide full CRUD for playbooks, phases, and lessons (including rich text lesson content).
The landing site will fetch playbook data from Supabase and track user progress at the lesson level using the purchaser's email (no auth required on the landing site).

---

## Design Decisions

| Decision                | Choice                                                           |
| ----------------------- | ---------------------------------------------------------------- |
| Auth model (landing)    | **Email-only** — progress tracked by Stripe purchase email       |
| Dashboard content scope | **Full content CMS** — rich text/markdown editor for lesson body |
| Progress granularity    | **Lesson-level only** — mark lessons complete/incomplete         |

---

## Database Schema

### Existing Tables (no changes)

- `playbook_access` — already stores `email` + `playbook_slug` from Stripe webhook
- `blog_posts`, `blog_comments`, `user_roles` — unrelated, untouched

---

### New Table: `playbooks`

Replaces the hardcoded `PlaybookConfig` objects and `COMING_SOON` entries.

| Column                  | Type          | Constraints                       | Description                       |
| ----------------------- | ------------- | --------------------------------- | --------------------------------- |
| `id`                    | `uuid`        | PK, default `gen_random_uuid()`   |                                   |
| `slug`                  | `text`        | UNIQUE, NOT NULL                  | URL slug (e.g. `spain-dnv`)       |
| `badge`                 | `text`        | NOT NULL                          | e.g. "Playbook Pro"               |
| `badge_label`           | `text`        | NOT NULL                          | e.g. "Application → Citizenship"  |
| `updated_label`         | `text`        |                                   | e.g. "Updated 2026"               |
| `hero_title`            | `text`        | NOT NULL                          |                                   |
| `hero_description`      | `text`        | NOT NULL                          |                                   |
| `total_time`            | `text`        |                                   | e.g. "~2.5 hrs"                   |
| `modal_features`        | `text[]`      |                                   | Bullet list for unlock modal      |
| `final_cta_title`       | `text`        |                                   |                                   |
| `final_cta_description` | `text`        |                                   |                                   |
| `catalog_emoji`         | `text`        |                                   | Emoji for catalog card            |
| `catalog_tagline`       | `text`        |                                   | 1-line hook                       |
| `catalog_description`   | `text`        |                                   | 2-sentence description            |
| `catalog_status`        | `text`        | NOT NULL, default `'coming-soon'` | `'available'` or `'coming-soon'`  |
| `catalog_accent`        | `text`        |                                   | Hex color for catalog card accent |
| `catalog_bg`            | `text`        |                                   | Hex color for catalog card bg     |
| `sort_order`            | `int`         | NOT NULL, default `0`             | Ordering on catalog page          |
| `created_at`            | `timestamptz` | default `now()`                   |                                   |
| `updated_at`            | `timestamptz` | default `now()`                   |                                   |

**Indexes:** `slug` (unique), `catalog_status`, `sort_order`

---

### New Table: `playbook_phases`

Replaces the `phases[]` array in each playbook config.

| Column        | Type          | Constraints                                     | Description              |
| ------------- | ------------- | ----------------------------------------------- | ------------------------ |
| `id`          | `uuid`        | PK, default `gen_random_uuid()`                 |                          |
| `playbook_id` | `uuid`        | FK → `playbooks.id` ON DELETE CASCADE, NOT NULL |                          |
| `phase_label` | `text`        | NOT NULL                                        | e.g. "Phase 0"           |
| `title`       | `text`        | NOT NULL                                        | e.g. "Qualify"           |
| `emoji`       | `text`        |                                                 |                          |
| `description` | `text`        |                                                 |                          |
| `accent`      | `text`        |                                                 | Hex color                |
| `bg`          | `text`        |                                                 | Hex color                |
| `sort_order`  | `int`         | NOT NULL, default `0`                           | Ordering within playbook |
| `created_at`  | `timestamptz` | default `now()`                                 |                          |
| `updated_at`  | `timestamptz` | default `now()`                                 |                          |

**Indexes:** `playbook_id` + `sort_order`

---

### New Table: `playbook_lessons`

Replaces the `lessons[]` array in each phase. Adds a `content` column for the full rich-text lesson body (the CMS part).

| Column        | Type          | Constraints                                           | Description                                               |
| ------------- | ------------- | ----------------------------------------------------- | --------------------------------------------------------- |
| `id`          | `uuid`        | PK, default `gen_random_uuid()`                       |                                                           |
| `phase_id`    | `uuid`        | FK → `playbook_phases.id` ON DELETE CASCADE, NOT NULL |                                                           |
| `playbook_id` | `uuid`        | FK → `playbooks.id` ON DELETE CASCADE, NOT NULL       | Denormalized for fast queries                             |
| `number`      | `text`        | NOT NULL                                              | Display number (e.g. "01", "02")                          |
| `title`       | `text`        | NOT NULL                                              |                                                           |
| `description` | `text`        |                                                       | Short description shown on card                           |
| `bullets`     | `text[]`      |                                                       | Bullet points for the lesson card                         |
| `time`        | `text`        |                                                       | e.g. "10 min"                                             |
| `tag`         | `text`        |                                                       | e.g. "Deep Dive", "Core Lesson"                           |
| `is_free`     | `boolean`     | NOT NULL, default `false`                             | Free vs Pro lesson                                        |
| `link`        | `text`        |                                                       | External page link (e.g. `/assessment`)                   |
| `content`     | `text`        |                                                       | **Rich text / Markdown** — full lesson body hosted in CMS |
| `sort_order`  | `int`         | NOT NULL, default `0`                                 | Ordering within phase                                     |
| `created_at`  | `timestamptz` | default `now()`                                       |                                                           |
| `updated_at`  | `timestamptz` | default `now()`                                       |                                                           |

**Indexes:** `phase_id` + `sort_order`, `playbook_id`

> **Note:** `content` stores the full lesson body as Markdown/HTML. If `link` is set, the lesson can optionally redirect to an external page instead. If `content` is filled, the lesson renders inline. Both can co-exist (content + external link as a reference).

---

### New Table: `playbook_lesson_progress`

Tracks which lessons a user has completed. Keyed by email (from Stripe purchase, no auth needed).

| Column         | Type          | Constraints                                            | Description                           |
| -------------- | ------------- | ------------------------------------------------------ | ------------------------------------- |
| `id`           | `uuid`        | PK, default `gen_random_uuid()`                        |                                       |
| `email`        | `text`        | NOT NULL                                               | User's email (from `playbook_access`) |
| `lesson_id`    | `uuid`        | FK → `playbook_lessons.id` ON DELETE CASCADE, NOT NULL |                                       |
| `playbook_id`  | `uuid`        | FK → `playbooks.id` ON DELETE CASCADE, NOT NULL        | Denormalized for fast queries         |
| `completed_at` | `timestamptz` | default `now()`                                        | When the lesson was marked complete   |

**Constraints:** UNIQUE on `(email, lesson_id)` — one completion record per user per lesson.

**Indexes:** `email` + `playbook_id` (for "show me all progress in this playbook"), `lesson_id`

---

## Entity Relationship Diagram

```
playbooks
  │
  ├──< playbook_phases         (1 playbook → many phases)
  │       │
  │       └──< playbook_lessons (1 phase → many lessons)
  │               │
  │               └──< playbook_lesson_progress (1 lesson → many user completions)
  │
  └──< playbook_access          (existing table: 1 playbook → many email grants)
```

---

## Dashboard (happy-voyager-dashboard)

### New Pages

| Route                                            | Purpose                                                 |
| ------------------------------------------------ | ------------------------------------------------------- |
| `/dashboard/playbooks`                           | List all playbooks (available + coming-soon) with stats |
| `/dashboard/playbooks/new`                       | Create a new playbook                                   |
| `/dashboard/playbooks/[slug]`                    | Edit playbook metadata, manage phases & lessons         |
| `/dashboard/playbooks/[slug]/phases/[phaseId]`   | Edit phase details + reorder lessons                    |
| `/dashboard/playbooks/[slug]/lessons/[lessonId]` | Edit lesson metadata + rich text content editor         |

### Key Components

| Component           | Purpose                                                                      |
| ------------------- | ---------------------------------------------------------------------------- |
| `PlaybookListTable` | Sortable table of all playbooks (slug, title, status, lesson count, actions) |
| `PlaybookForm`      | Form for playbook metadata (hero, catalog, modal features, CTA)              |
| `PhaseManager`      | Drag-and-drop phase reordering + inline create/edit/delete                   |
| `LessonForm`        | Full lesson editor — metadata fields + rich text content editor              |
| `LessonReorder`     | Drag-and-drop lesson reordering within a phase                               |
| `ProgressOverview`  | View user progress stats per playbook (admin view)                           |

### Rich Text Editor

Use a Markdown editor (e.g. `@uiw/react-md-editor` or similar) for the lesson `content` field. Markdown is stored in the DB and rendered on the frontend with a Markdown renderer.

---

## Landing Site (happy-voyager-landing)

### Data Fetching Changes

Replace the static imports from `data/playbooks/` with Supabase queries:

| Current (static)      | New (Supabase)                                                                                              |
| --------------------- | ----------------------------------------------------------------------------------------------------------- |
| `getPlaybook(slug)`   | `supabase.from('playbooks').select('*, playbook_phases(*, playbook_lessons(*))').eq('slug', slug).single()` |
| `getAvailableSlugs()` | `supabase.from('playbooks').select('slug').eq('catalog_status', 'available')`                               |
| `COMING_SOON` array   | `supabase.from('playbooks').select('*').eq('catalog_status', 'coming-soon')`                                |

### New API Routes

| Route                    | Method   | Purpose                                                |
| ------------------------ | -------- | ------------------------------------------------------ |
| `/api/playbook/progress` | `GET`    | Fetch all completed lesson IDs for an email + playbook |
| `/api/playbook/progress` | `POST`   | Mark a lesson as complete (email + lesson_id)          |
| `/api/playbook/progress` | `DELETE` | Unmark a lesson (email + lesson_id)                    |

### Frontend Progress Tracking

- After verifying Pro access (existing flow), fetch the user's progress for the playbook
- Show a progress bar per phase (X of Y lessons complete)
- Show a checkmark on completed lesson cards
- "Mark as Complete" button inside the lesson view
- Progress persisted in `playbook_lesson_progress` table, keyed by email
- Store email in localStorage (already done via existing Stripe verify flow)

---

## Migration Strategy

### Phase 1: Database Setup

1. Create the 4 new tables via Supabase migration
2. Set up RLS policies:
   - `playbooks`, `playbook_phases`, `playbook_lessons`: public read, authenticated write (dashboard admins)
   - `playbook_lesson_progress`: insert/select/delete where `email` matches (via API route, not direct client access)
3. Create `updated_at` trigger function for auto-updating timestamps

### Phase 2: Seed Existing Data

1. Write a seed script that inserts `spain-dnv.ts` and `visa-runner.ts` data into the new tables
2. Insert the 4 `COMING_SOON` entries as `catalog_status = 'coming-soon'` playbooks
3. Verify data integrity

### Phase 3: Dashboard CMS

1. Add playbook sidebar nav item
2. Build playbook list page
3. Build playbook create/edit form
4. Build phase manager (CRUD + reorder)
5. Build lesson editor with rich text/markdown
6. Build progress overview (admin stats)

### Phase 4: Landing Site Integration

1. Replace static playbook imports with Supabase queries
2. Add progress API routes
3. Update `PlaybookTemplate.tsx` to show progress UI
4. Add "Mark as Complete" functionality
5. Test end-to-end: purchase → access → progress tracking

### Phase 5: Cleanup

1. Remove hardcoded `data/playbooks/*.ts` files (keep as backup reference)
2. Remove `COMING_SOON` array from `index.ts`
3. Update `generateStaticParams` to use Supabase (or switch to dynamic rendering)

---

## Summary

| What                     | Count                                                                              |
| ------------------------ | ---------------------------------------------------------------------------------- |
| New Supabase tables      | 4 (`playbooks`, `playbook_phases`, `playbook_lessons`, `playbook_lesson_progress`) |
| New dashboard pages      | 5                                                                                  |
| New dashboard components | ~6                                                                                 |
| New landing API routes   | 1 (`/api/playbook/progress` with GET/POST/DELETE)                                  |
| Existing tables modified | 0                                                                                  |
| Auth changes             | None — email-only tracking preserved                                               |
