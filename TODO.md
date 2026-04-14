# DexHome — Developer TODO

> **Last updated:** 2026-04-14
>
> Living document. Work top-to-bottom — each phase unblocks the next.
> Items marked `[?]` need client clarification before building.

---

## Status Legend

| Symbol | Meaning                       |
| ------ | ----------------------------- |
| `[ ]`  | Not started                   |
| `[~]`  | In progress                   |
| `[x]`  | Done                          |
| `[?]`  | Blocked — needs client answer |

---

## Phase 0 — Foundation (do this first)

- [x] **Full Prisma schema** — 25 models, 18 enums in `prisma/schema.prisma`
- [x] **Database** — create a Supabase or Neon project, paste `DATABASE_URL` into `.env`
- [x] **First migration** — `npx prisma migrate dev --name init`
- [~] **Authentication** — implement NextAuth.js v5
  - Login page: `/login` (unified, redirect by role after sign-in)
  - Session shape must carry: `{ id, email, role, profileId }`
  - Providers: email+password (credentials) + optional Google OAuth
- [~] **Middleware** — `src/middleware.ts` route guard
  - `/customer/*` → requires `CUSTOMER`
  - `/mitra/admin/*` → requires `MITRA_ADMIN`
  - `/mitra/*` → requires `MITRA_USER` or `MITRA_ADMIN`
  - `/admin/*` → requires `CENTER_ADMIN`
  - Unauthenticated → redirect to `/login`
- [x] **Environment file** — create `.env.example` with all required keys documented

---

## Phase 1 — Component Extraction (do before API wiring)

> All 4 portal pages are monolithic (400–900 lines of inline JSX). Extract before
> adding more code — otherwise the files become impossible to work on in parallel.

### Layout (shared across all portals)

- [ ] `src/components/layout/PortalShell.tsx` — sidebar + topbar wrapper
- [~] `src/components/layout/Sidebar.tsx` — done for customer portal (`src/app/customer/component/Sidebar.tsx`); needs generalizing for other portals
- [~] `src/components/layout/Topbar.tsx` — done for customer portal (`src/app/customer/component/Topbar.tsx`); needs generalizing for other portals

### UI Primitives (shared)

- [ ] `src/components/ui/KpiCard.tsx` — metric + icon + trend pill
- [ ] `src/components/ui/DataTable.tsx` — generic sortable table
- [x] `src/components/Badge.tsx` — color-aware badge (`color` prop: green/gold/red/blue/grey/pur)
- [x] `src/components/Btn.tsx` — button with `variant` prop (primary/gold/outline/dark/red/green), `type`, `disabled`
- [x] `src/components/Card.tsx` — card with box shadow, forwards all div props
- [x] `src/components/SectionHeader.tsx` — label + title + optional action slot
- [ ] `src/components/ui/Modal.tsx` — accessible dialog wrapper
- [ ] `src/components/ui/FilterTabs.tsx` — tab strip with active indicator

### Customer Components

> Customer portal has been split from one monolithic file into separate page files.
> Full component extraction into `src/components/customer/` is still pending.

- [x] Customer portal split: `dashboard/`, `katalog/`, `showroom/`, `customerService/` under `src/app/customer/Main-menu/`
- [ ] `src/components/customer/PointsCard.tsx` — balance, tier badge, progress bar
- [ ] `src/components/customer/OrderHistory.tsx` — order table with status tracking
- [ ] `src/components/customer/VoucherGrid.tsx` — voucher cards (active/expiring/used)
- [ ] `src/components/customer/InsuranceList.tsx` — per-item insurance status

### Catalog Components

- [~] `src/components/catalog/ProductCard.tsx` — inline in `katalog/page.tsx`; wired to real API data (images, price, rating) — extract when needed
- [ ] `src/components/catalog/ProductGrid.tsx` — responsive grid with filter sidebar
- [ ] `src/components/catalog/AvailabilityMap.tsx` — nearest mitra list/map for product

### Showroom Components

- [ ] `src/components/showroom/ShowroomMap.tsx` — map embed with mitra markers
- [ ] `src/components/showroom/ShowroomCard.tsx` — list item: name, city, distance, CTA

### Mitra Components

- [ ] `src/components/mitra/AnnouncementList.tsx` — cards with read/unread state
- [ ] `src/components/mitra/CatalogTable.tsx` — product table with inline stock edit
- [ ] `src/components/mitra/CommunityFeed.tsx` — post list, composer, like/reply actions

### Customer Service Components

- [x] Customer CS chat UI — fully wired to API: ticket list, message thread, new ticket modal, optimistic send, auto-scroll (`src/app/customer/Main-menu/customerService/page.tsx`)
- [x] Admin CS chat UI — dark purple theme, ticket queue with search/filter, agent reply, status actions (`src/app/admin/CSAdmin/page.tsx`)
- [ ] Extract to `src/components/cs/TicketForm.tsx` — new ticket form with file upload
- [ ] Extract to `src/components/cs/TicketList.tsx` — sortable ticket queue
- [ ] Extract to `src/components/cs/MessageThread.tsx` — chat-style message view with attachments

---

## Phase 2 — API Routes & Database Wiring

> Wire each portal section to real data. The UI mockups already show what's needed —
> just replace hardcoded arrays with `fetch()` calls to these routes.
>
> **Note on route naming:** API routes currently live under `/api/item/` and `/api/users/`.
> These will eventually be reorganized to match the paths below as more routes are added.

### Auth API

- [ ] `POST /api/auth/[...nextauth]` — NextAuth route handler
- [ ] `GET  /api/auth/session` — returns `SessionUser` shape

### Customer API

- [x] `GET  /api/customer/dashboard` — points, tier, recent orders, active vouchers, counts
- [x] `GET  /api/customer/orders` — paginated order history with items + variant + product image
- [ ] `GET  /api/customer/orders/[id]` — single order detail
- [ ] `GET  /api/customer/points` — paginated `PointTransaction[]`
- [x] `GET  /api/customer/vouchers` — claimed vouchers (active/unused, excludes expired)
- [ ] `POST /api/customer/vouchers/claim` — redeem voucher by code
- [x] `GET  /api/customer/wishlist` — wishlist items with product image
- [x] `POST /api/customer/wishlist` — toggle wishlist (add or remove, returns `{ wishlisted }`)
- [ ] `DELETE /api/customer/wishlist/[productId]` — remove from wishlist

### Catalog API

- [x] `GET  /api/item` — paginated product list (`?page=&limit=&category=`), ACTIVE only, includes mitra name + category icon + cover image + avg rating
- [x] `GET  /api/item/[id]` — product detail with images, variants, reviews (latest 10), mitra info
- [x] `GET  /api/item/[id]/availability` — `StockPerShowroom[]` where quantity > 0, includes mitra lat/lng for distance calc
- [x] `GET  /api/item/category` — list all categories; `?slug=<slug>` returns products in that category

### Showroom API

- [ ] `GET  /api/showrooms` — all `ACTIVE` mitra with lat/lng/city/name
- [ ] `GET  /api/showrooms/[id]` — showroom detail + in-stock product count

### CS API — Customer

- [x] `POST /api/customer/cs` — create ticket `{ customerId, subject }`
- [x] `GET  /api/customer/cs` — customer's own tickets, paginated, with last-message snippet
- [x] `GET  /api/customer/cs/[id]` — ticket + full message thread (ownership verified)
- [x] `POST /api/customer/cs/[id]/message` — send message; bumps ANSWERED → OPEN

### CS API — Admin

- [x] `GET  /api/admin/cs` — all tickets, filterable by status + full-text search
- [x] `GET  /api/admin/cs/[id]` — ticket detail + messages + customer info
- [x] `PATCH /api/admin/cs/[id]` — update status (RESOLVED/CLOSED/OPEN) or assign agent
- [x] `POST /api/admin/cs/[id]/reply` — agent reply → auto-sets ticket to ANSWERED

### File Storage

- [x] `POST /api/centralAdmin/upload` — multipart upload → Supabase S3, returns public URL; 8 MB limit, image types only

### Mitra User API

- [ ] `GET  /api/mitra/announcements` — announcements for this mitra (with read status)
- [ ] `POST /api/mitra/announcements/[id]/read` — mark as read
- [ ] `GET  /api/mitra/catalog` — this mitra's products + stock
- [ ] `GET  /api/mitra/community/posts` — paginated community feed
- [ ] `POST /api/mitra/community/posts` — create post
- [ ] `POST /api/mitra/community/posts/[id]/replies` — reply to post
- [ ] `POST /api/mitra/community/posts/[id]/like` — toggle like

### Mitra Admin API

- [ ] `GET  /api/mitra/admin/dashboard` — GMV, orders, critical stock, rating
- [ ] `GET  /api/mitra/admin/orders` — orders fulfilled by this mitra
- [ ] `PATCH /api/mitra/admin/orders/[id]` — update order status
- [ ] `GET  /api/mitra/admin/stock` — `StockPerShowroom[]` for this mitra
- [ ] `PATCH /api/mitra/admin/stock/[id]` — update quantity
- [ ] `POST /api/mitra/admin/points` — input points for a customer
- [ ] `GET  /api/mitra/admin/points/history` — this mitra's point input log

### Center Admin API

- [ ] `GET  /api/admin/overview` — platform KPIs + GMV chart + top mitra
- [ ] `GET  /api/admin/mitras` — all mitras, paginated + filterable
- [ ] `PATCH /api/admin/mitras/[id]` — approve/suspend/update mitra
- [ ] `GET  /api/admin/products` — all products across platform (with moderation filter)
- [ ] `POST /api/admin/products` — create product
- [ ] `PATCH /api/admin/products/[id]` — update/approve/reject product
- [ ] `DELETE /api/admin/products/[id]` — deactivate product
- [ ] `GET  /api/admin/announcements` — all announcements with read counts
- [ ] `POST /api/admin/announcements` — create and publish announcement
- [x] `GET  /api/admin/cs` — all tickets (agent view, filterable by status + search) — see CS API — Admin above
- [x] `PATCH /api/admin/cs/[id]` — assign agent, change status — see CS API — Admin above
- [ ] `GET  /api/admin/vouchers` — all vouchers
- [ ] `POST /api/admin/vouchers` — create voucher
- [ ] `PATCH /api/admin/vouchers/[id]` — edit/deactivate voucher
- [x] `GET  /api/users` — fixed (was returning a hardcoded string); proper select, try/catch
- [x] `GET  /api/users/[id]` — fixed UUID id bug (`Number(id)` → `id`), proper select
- [x] `PATCH /api/users/[id]` — fixed same UUID bug
- [x] `DELETE /api/users/[id]` — fixed same UUID bug

---

## Phase 3 — Features Requiring External Services

> Don't start these until Phase 2 is at least 60% done. Each needs a vendor decision.

### Map Integration — Showroom Finder

- [?] **Decide provider:** `react-leaflet` + OpenStreetMap (free) vs. Google Maps (paid, better UX)
- [ ] Embed map in `ShowroomMap.tsx` with mitra markers
- [ ] Click marker → showroom popup (name, address, CTA: "Buka di Maps")
- [ ] "Get directions" link → `https://maps.google.com/?q=<lat>,<lng>`
- [ ] Geocode mitra address → lat/lng during mitra onboarding (or admin edit)
- [?] Filter map by product category?

### File Storage — Uploads

- [x] **Provider decided:** Supabase Storage (S3-compatible) — `src/lib/buckets-s3.ts`, bucket `products`
- [x] `POST /api/centralAdmin/upload` — multipart, validates type + 8 MB, uploads to Supabase S3, returns `{ url, path }`
- [ ] Wire upload to: CS ticket attachments, announcement attachments, showroom logo
- [ ] Product image upload wired into admin product create/edit form

### Real-time — CS Chat & Notifications

- [?] **Decide strategy:**
  - **Option A:** Supabase Realtime — zero extra setup if already on Supabase
  - **Option B:** Server-Sent Events — simple, no vendor, one-way push
  - **Option C:** Pusher/Ably — full duplex, extra cost
- [ ] Live message delivery in CS ticket thread
- [ ] Unread notification count badge in sidebar (now hardcoded as `2`, `47`)

### Payment — Order Flow

- [?] **CRITICAL — confirm with client:** Does the customer order through the app, or does the app just connect them to visit the showroom in person?
- If in-app orders:
  - [?] Payment gateway: **Midtrans** (most common in ID) or **Xendit**?
  - [ ] `POST /api/orders` — create order, initiate payment
  - [ ] Payment callback webhook
  - [ ] Order status update flow

---

## Phase 4 — Polish & Production Readiness

- [ ] `loading.tsx` skeleton screens for every portal section
- [ ] `error.tsx` boundaries per route segment
- [ ] `not-found.tsx` pages
- [ ] All images through `next/image` (not `<img>`) — katalog page currently uses `<img>`
- [ ] Rate limiting on auth + upload endpoints
- [ ] CSRF verification (check NextAuth v5 defaults)
- [ ] Input sanitization on all user-submitted text
- [x] Pagination on catalog list endpoint (`/api/item?page=&limit=`)
- [ ] Pagination on remaining list endpoints (orders, vouchers, tickets, etc.)
- [x] Seed script (`prisma/seed.ts`) — exists, has BigInt issue with TS target (minor, not blocking)

---

## Shared Library TODOs

| File                      | Status     | Notes                                              |
| ------------------------- | ---------- | -------------------------------------------------- |
| `src/lib/prisma.ts`       | ✅ Done    | Singleton + pg adapter                             |
| `src/lib/api-response.ts` | ✅ Done    | `ok()`, `err()`, `paginated()` — now used by all API routes |
| `src/lib/geo.ts`          | ✅ Done    | `haversineKm()` for showroom finder                |
| `src/lib/auth.ts`         | ❌ Missing | NextAuth config, session callbacks                 |
| `src/lib/buckets-s3.ts`   | ✅ Done    | `getS3()`, `getPublicUrl()`, Supabase S3 client    |
| `src/middleware.ts`       | ❌ Missing | Route protection by role                           |
| `src/types/index.ts`      | ✅ Done    | All shared TypeScript types                        |

---

## Open Questions for Client

> These are blockers or near-blockers. Raise in next sync.

1. **[CRITICAL] Ordering flow** — in-app checkout or showroom-visit only? Affects entire Phase 2 order API.
2. **[CRITICAL] Payment gateway** — Midtrans or Xendit (if ordering is in-app)?
3. **Catalog ownership** — products tied to one mitra, or can one product be stocked by multiple mitras? (Current schema: `product.mitraId` = single owner; `StockPerShowroom` = multi-showroom stock. Confirm this is correct.)
4. **Staff management** — can `MITRA_ADMIN` invite/remove `MITRA_USER` accounts from the app UI, or is that handled by Center Admin only?
5. **Notifications** — email, SMS (Twilio/Vonage), in-app push, or which combination?
6. **Map provider** — budget for Google Maps API, or use free OpenStreetMap?
7. **Storage provider** — Supabase Storage (easier if on Supabase) or separate (Cloudflare R2)?
8. **Operating hours** — does each showroom need opening hours? Not currently in schema — needs `MitraProfile.operatingHours` or a separate table.
9. **Tier thresholds** — what total spend/points moves a customer from Silver → Gold → Platinum? Needed to implement tier upgrade logic.
10. **Product reviews** — only after a verified purchase, or open to anyone?

---

## Dev Environment Checklist (for new team members)

- [ ] Clone repo
- [ ] `npm install` (or `bun install`)
- [ ] Create Supabase or Neon project → copy connection string
- [ ] `cp .env.example .env` → fill `DATABASE_URL` and `NEXTAUTH_SECRET`
- [ ] `npx prisma migrate dev --name init`
- [ ] `npx prisma db seed` — seeds test users, mitra, products, tickets (password: `password123`)
- [ ] `npm run dev`
- [ ] Read `AGENTS.md` — **this is not standard Next.js**, read `node_modules/next/dist/docs/` before touching routing or data fetching
