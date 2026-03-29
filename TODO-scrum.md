# DexHome — Scrum Backlog

> **Last updated:** 2026-03-29
> **Team:** hiyokun-d (DevOps/Lead) + claude (AI pair)
> **Sprint length:** 2 weeks
> **Story points:** Fibonacci (1 · 2 · 3 · 5 · 8 · 13)

---

## Status Key

| Symbol | Meaning |
|---|---|
| `🔲 Backlog` | Not started, not yet scheduled |
| `📋 Ready` | Refined, ready to pull into sprint |
| `🔄 In Progress` | Being worked on this sprint |
| `🔍 Review` | PR open, needs review |
| `✅ Done` | Merged to main |
| `🚫 Blocked` | Waiting on decision or dependency |

---

## Epic Overview

| Epic ID | Epic Name | Sprint Target | Status |
|---|---|---|---|
| E-01 | Foundation | Sprint 1 | 🔲 Backlog |
| E-02 | Component Extraction | Sprint 2 | 🔲 Backlog |
| E-03 | Customer Portal APIs | Sprint 3 | 🔲 Backlog |
| E-04 | Catalog & Showroom | Sprint 4 | 🔲 Backlog |
| E-05 | Mitra Portal APIs | Sprint 5 | 🔲 Backlog |
| E-06 | Center Admin APIs | Sprint 6 | 🔲 Backlog |
| E-07 | External Services | Sprint 7 | 🔲 Backlog |
| E-08 | Polish & Security | Sprint 8 | 🔲 Backlog |
| E-09 | CI / DevOps | Ongoing | ✅ Done |

---

## Sprint 1 — Foundation

**Goal:** Any developer can run the app locally with a real database and authenticated session.

| ID | User Story | Task | Points | Priority | Status | Depends On |
|---|---|---|---|---|---|---|
| US-001 | As a dev, I need a running database | Create Supabase or Neon project, add `DATABASE_URL` + `DIRECT_URL` to `.env` | 2 | P1 | 🔲 Backlog | — |
| US-002 | As a dev, I need the schema migrated | Run `npx prisma migrate dev --name init` | 1 | P1 | ✅ Done | US-001 |
| US-003 | As any user, I want to log in | Implement NextAuth v5 credentials provider (email + password) | 8 | P1 | 🔲 Backlog | US-001 |
| US-004 | As any user, I get redirected if not logged in | Create `src/middleware.ts` — enforce role per route prefix | 3 | P1 | 🔲 Backlog | US-003 |
| US-005 | As a dev, I want clear auth config | Create `src/lib/auth.ts` with session shape `{ id, email, role, profileId }` | 3 | P1 | 🔲 Backlog | US-003 |
| US-006 | As a dev, I want a seed script | Create `prisma/seed.ts` with realistic sample data for all roles | 5 | P2 | 🔲 Backlog | US-002 |
| US-007 | As a new dev, I want env setup docs | Create `.env.example` with all required keys documented | 1 | P2 | 🔲 Backlog | — |

**Sprint 1 total:** 23 points

---

## Sprint 2 — Component Extraction

**Goal:** Page files are split — no single file exceeds 300 lines. Team can work in parallel.

| ID | User Story | Task | Points | Priority | Status | Depends On |
|---|---|---|---|---|---|---|
| US-008 | As a dev, I want shared layout | Extract `PortalShell`, `Sidebar`, `Topbar` from all portal pages | 5 | P1 | 🔲 Backlog | — |
| US-009 | As a dev, I want shared UI atoms | Extract `KpiCard`, `DataTable`, `Badge`, `Modal`, `FilterTabs` | 5 | P1 | 🔲 Backlog | US-008 |
| US-010 | As a dev, I want customer components | Extract `PointsCard`, `OrderHistory`, `VoucherGrid`, `InsuranceList` | 5 | P1 | 🔲 Backlog | US-009 |
| US-011 | As a dev, I want catalog components | Extract `ProductCard`, `ProductGrid`, `AvailabilityMap` | 3 | P1 | 🔲 Backlog | US-009 |
| US-012 | As a dev, I want showroom components | Extract `ShowroomMap`, `ShowroomCard` | 3 | P2 | 🔲 Backlog | US-009 |
| US-013 | As a dev, I want mitra components | Extract `AnnouncementList`, `CatalogTable`, `CommunityFeed` | 3 | P1 | 🔲 Backlog | US-009 |
| US-014 | As a dev, I want CS components | Extract `TicketForm`, `TicketList`, `MessageThread` | 3 | P2 | 🔲 Backlog | US-009 |

**Sprint 2 total:** 27 points

---

## Sprint 3 — Customer Portal APIs

**Goal:** Customer dashboard, orders, and points show real data from the database.

| ID | User Story | Task | Points | Priority | Status | Depends On |
|---|---|---|---|---|---|---|
| US-015 | As a customer, I see my dashboard stats | `GET /api/customer/dashboard` — points, tier, order count, vouchers, insurance | 5 | P1 | 🔲 Backlog | US-002, US-003 |
| US-016 | As a customer, I see my order history | `GET /api/customer/orders` — paginated with status | 3 | P1 | 🔲 Backlog | US-015 |
| US-017 | As a customer, I see my points log | `GET /api/customer/points` — paginated `PointTransaction[]` | 3 | P1 | 🔲 Backlog | US-015 |
| US-018 | As a customer, I manage my vouchers | `GET /api/customer/vouchers`, `POST /api/customer/vouchers/claim` | 3 | P2 | 🔲 Backlog | US-015 |
| US-019 | As a customer, I manage my wishlist | `GET/POST/DELETE /api/customer/wishlist` | 2 | P2 | 🔲 Backlog | US-015 |
| US-020 | As a customer, I see my insurance | Included in dashboard response (`InsuranceCoverage[]` per order) | 2 | P2 | 🔲 Backlog | US-015 |
| US-021 | As a customer, I wire the dashboard UI | Connect `customer/page.tsx` dashboard section to `/api/customer/dashboard` | 3 | P1 | 🔲 Backlog | US-015 |

**Sprint 3 total:** 21 points

---

## Sprint 4 — Catalog & Showroom

**Goal:** Customer can browse products, find the nearest showroom, and add items to wishlist.

| ID | User Story | Task | Points | Priority | Status | Depends On |
|---|---|---|---|---|---|---|
| US-022 | As a customer, I browse the catalog | `GET /api/catalog/products?category=&search=&minPrice=&maxPrice=&page=` | 5 | P1 | 🔲 Backlog | US-002 |
| US-023 | As a customer, I see product details | `GET /api/catalog/products/[id]` — with images, variants | 3 | P1 | 🔲 Backlog | US-022 |
| US-024 | As a customer, I see nearby stock | `GET /api/catalog/products/[id]/availability?lat=&lng=` — Haversine sort | 5 | P1 | 🔲 Backlog | US-023 |
| US-025 | As a customer, I browse categories | `GET /api/catalog/categories` — category tree | 2 | P2 | 🔲 Backlog | US-002 |
| US-026 | As a customer, I see all showrooms on a map | `GET /api/showrooms` — active mitra with lat/lng; embed map (OSM/Google) | 8 | P1 | 🚫 Blocked | Map provider decision |
| US-027 | As a customer, I see a showroom detail | `GET /api/showrooms/[id]` — details + product count | 3 | P2 | 🔲 Backlog | US-026 |
| US-028 | As a customer, I can get directions | "Open in Maps" link using mitra lat/lng | 1 | P3 | 🔲 Backlog | US-026 |

**Sprint 4 total:** 27 points

---

## Sprint 5 — Mitra Portal APIs

**Goal:** Mitra staff can read announcements and manage community. Mitra admin can manage stock and input points.

| ID | User Story | Task | Points | Priority | Status | Depends On |
|---|---|---|---|---|---|---|
| US-029 | As a mitra user, I see announcements | `GET /api/mitra/announcements` with read status | 3 | P1 | 🔲 Backlog | US-002, US-003 |
| US-030 | As a mitra user, I mark announcements read | `POST /api/mitra/announcements/[id]/read` | 1 | P2 | 🔲 Backlog | US-029 |
| US-031 | As a mitra user, I see my catalog | `GET /api/mitra/catalog` — this mitra's products + stock levels | 3 | P1 | 🔲 Backlog | US-002, US-003 |
| US-032 | As a mitra user, I post to community | `GET/POST /api/mitra/community/posts`, replies, likes | 5 | P2 | 🔲 Backlog | US-031 |
| US-033 | As a mitra admin, I see my dashboard | `GET /api/mitra/admin/dashboard` — GMV, orders, critical stock | 5 | P1 | 🔲 Backlog | US-002, US-003 |
| US-034 | As a mitra admin, I manage my orders | `GET /api/mitra/admin/orders`, `PATCH .../[id]` (update status) | 5 | P1 | 🔲 Backlog | US-033 |
| US-035 | As a mitra admin, I manage stock | `GET/PATCH /api/mitra/admin/stock` — update `StockPerShowroom` quantity | 3 | P1 | 🔲 Backlog | US-033 |
| US-036 | As a mitra admin, I input customer points | `POST /api/mitra/admin/points` — search customer, log transaction | 5 | P1 | 🔲 Backlog | US-033 |

**Sprint 5 total:** 30 points

---

## Sprint 6 — Center Admin APIs

**Goal:** Center admin can manage the full platform — mitras, products, announcements, CS tickets.

| ID | User Story | Task | Points | Priority | Status | Depends On |
|---|---|---|---|---|---|---|
| US-037 | As center admin, I see platform overview | `GET /api/admin/overview` — KPIs, GMV chart, top mitra | 5 | P1 | 🔲 Backlog | US-002, US-003 |
| US-038 | As center admin, I manage mitras | `GET/PATCH /api/admin/mitras/[id]` — approve, suspend, edit | 5 | P1 | 🔲 Backlog | US-037 |
| US-039 | As center admin, I moderate products | `GET /api/admin/products`, `PATCH .../[id]` (approve/reject) | 5 | P1 | 🔲 Backlog | US-037 |
| US-040 | As center admin, I publish announcements | `GET/POST /api/admin/announcements` — target by mitra status | 3 | P1 | 🔲 Backlog | US-037 |
| US-041 | As center admin, I manage CS tickets | `GET/PATCH /api/admin/cs/tickets` — assign agents, change status | 5 | P1 | 🔲 Backlog | US-037 |
| US-042 | As center admin, I manage vouchers | `GET/POST/PATCH /api/admin/vouchers` | 3 | P2 | 🔲 Backlog | US-037 |
| US-043 | As center admin, I manage users | `GET /api/admin/users` — replace stub `/api/users` | 2 | P2 | 🔲 Backlog | US-037 |

**Sprint 6 total:** 28 points

---

## Sprint 7 — CS Ticket System + External Services

**Goal:** Customers can submit tickets and chat. Files can be uploaded. Map shows real showroom pins.

| ID | User Story | Task | Points | Priority | Status | Depends On |
|---|---|---|---|---|---|---|
| US-044 | As a customer, I submit a CS ticket | `POST /api/cs/tickets` — create ticket + optional warranty claim | 5 | P1 | 🔲 Backlog | US-021 |
| US-045 | As a customer, I chat with support | `GET /api/cs/tickets/[id]`, `POST .../messages` — message thread | 5 | P1 | 🔲 Backlog | US-044 |
| US-046 | As a user, I upload files | `POST /api/upload` — validate type/size, return CDN URL | 5 | P1 | 🚫 Blocked | Storage provider decision |
| US-047 | As a customer, I get live CS replies | Real-time message delivery in ticket thread | 8 | P2 | 🚫 Blocked | Real-time strategy decision |
| US-048 | As a customer, I see my warranty claims | Wire warranty claim flow to `WarrantyClaim` table | 3 | P2 | 🔲 Backlog | US-044 |

**Sprint 7 total:** 26 points

---

## Sprint 8 — Polish & Security

**Goal:** App is production-ready — no loading jumps, no obvious security gaps, no broken edge cases.

| ID | User Story | Task | Points | Priority | Status | Depends On |
|---|---|---|---|---|---|---|
| US-049 | As a user, I see loading skeletons | Add `loading.tsx` for every portal section | 3 | P1 | 🔲 Backlog | Sprint 3–6 |
| US-050 | As a user, I see a friendly error page | Add `error.tsx` and `not-found.tsx` per route segment | 2 | P1 | 🔲 Backlog | Sprint 3–6 |
| US-051 | As a user, images load fast | Replace all `<img>` tags with `next/image` | 2 | P2 | 🔲 Backlog | Sprint 2 |
| US-052 | As an admin, brute-force is limited | Rate limiting on `/api/auth` and `/api/upload` | 3 | P1 | 🔲 Backlog | US-003, US-046 |
| US-053 | As a user, my input is safe | Zod validation on all `POST`/`PATCH` API routes | 5 | P1 | 🔲 Backlog | Sprint 3–6 |
| US-054 | As a dev, lists don't return all rows | Pagination enforced on all list endpoints | 3 | P1 | 🔲 Backlog | Sprint 3–6 |

**Sprint 8 total:** 18 points

---

## Blocked / Open Questions (need client decision before sprint)

| ID | Question | Blocks | Owner | Due |
|---|---|---|---|---|
| Q-01 | **Ordering flow** — in-app checkout or showroom-visit only? | US-034, entire order API | Client | ASAP |
| Q-02 | **Payment gateway** — Midtrans or Xendit? (if in-app orders) | Sprint 7 payment tasks | Client | Sprint 4 |
| Q-03 | **Map provider** — free OpenStreetMap or paid Google Maps? | US-026 | Client | Sprint 3 |
| Q-04 | **Storage provider** — Supabase Storage or Cloudflare R2? | US-046 | Client | Sprint 5 |
| Q-05 | **Real-time strategy** — Supabase Realtime, SSE, or Pusher? | US-047 | Client | Sprint 6 |
| Q-06 | **Tier thresholds** — what spend/points triggers Silver→Gold→Platinum? | Points tier logic | Client | Sprint 3 |
| Q-07 | **Staff management** — can `MITRA_ADMIN` invite `MITRA_USER` in-app? | US-035 scope | Client | Sprint 4 |
| Q-08 | **Notifications** — email, SMS, in-app push, or all three? | Sprint 7–8 notification tasks | Client | Sprint 5 |

---

## Velocity Reference

| Sprint | Points | Notes |
|---|---|---|
| Sprint 1 | 23 | Foundation — mostly config, high uncertainty |
| Sprint 2 | 27 | Refactor — predictable, no API calls |
| Sprint 3 | 21 | First API sprint — may be slower |
| Sprint 4 | 27 | Catalog + map (map blocked pending Q-03) |
| Sprint 5 | 30 | Heaviest sprint — split if needed |
| Sprint 6 | 28 | Admin APIs — largely copy pattern from Sprint 5 |
| Sprint 7 | 26 | External services — depends on Q-04, Q-05 |
| Sprint 8 | 18 | Polish — parallelisable across the team |
| **Total** | **200** | ~16 weeks at 25 pts/sprint (2-person team) |
