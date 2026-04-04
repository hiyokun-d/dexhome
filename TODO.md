# DexHome — Developer TODO

> **Last updated:** 2026-03-29
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
- [ ] `src/components/layout/Sidebar.tsx` — nav items, active state, role-aware
- [ ] `src/components/layout/Topbar.tsx` — search bar, notification bell, user avatar

### UI Primitives (shared)

- [ ] `src/components/ui/KpiCard.tsx` — metric + icon + trend pill
- [ ] `src/components/ui/DataTable.tsx` — generic sortable table
- [ ] `src/components/ui/Badge.tsx` — status colors per enum value
- [ ] `src/components/ui/Modal.tsx` — accessible dialog wrapper
- [ ] `src/components/ui/FilterTabs.tsx` — tab strip with active indicator

### Customer Components

- [ ] `src/components/customer/PointsCard.tsx` — balance, tier badge, progress bar
- [ ] `src/components/customer/OrderHistory.tsx` — order table with status tracking
- [ ] `src/components/customer/VoucherGrid.tsx` — voucher cards (active/expiring/used)
- [ ] `src/components/customer/InsuranceList.tsx` — per-item insurance status

### Catalog Components

- [ ] `src/components/catalog/ProductCard.tsx` — image, name, price, wishlist toggle
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

- [ ] `src/components/cs/TicketForm.tsx` — new ticket form with file upload
- [ ] `src/components/cs/TicketList.tsx` — sortable ticket queue
- [ ] `src/components/cs/MessageThread.tsx` — chat-style message view with attachments

---

## Phase 2 — API Routes & Database Wiring

> Wire each portal section to real data. The UI mockups already show what's needed —
> just replace hardcoded arrays with `fetch()` calls to these routes.

### Auth API

- [ ] `POST /api/auth/[...nextauth]` — NextAuth route handler
- [ ] `GET  /api/auth/session` — returns `SessionUser` shape

### Customer API

- [ ] `GET  /api/customer/dashboard` — points, tier, order stats, active vouchers, insurance summary
- [ ] `GET  /api/customer/orders` — paginated order history with items
- [ ] `GET  /api/customer/orders/[id]` — single order detail
- [ ] `GET  /api/customer/points` — paginated `PointTransaction[]`
- [ ] `GET  /api/customer/vouchers` — claimed vouchers (active/used/expired)
- [ ] `POST /api/customer/vouchers/claim` — redeem voucher by code
- [ ] `GET  /api/customer/wishlist` — wishlist items
- [ ] `POST /api/customer/wishlist` — add to wishlist
- [ ] `DELETE /api/customer/wishlist/[productId]` — remove from wishlist

### Catalog API

- [x] `GET  /api/catalog/products` — list with `?category=&search=&minPrice=&maxPrice=&page=`
- [x] `GET  /api/catalog/products/[id]` — product detail with images and variants
- [ ] `GET  /api/catalog/products/[id]/availability` — `?lat=&lng=` → nearest `StockPerShowroom[]`
- [ ] `GET  /api/catalog/categories` — category tree

### Showroom API

- [ ] `GET  /api/showrooms` — all `ACTIVE` mitra with lat/lng/city/name
- [ ] `GET  /api/showrooms/[id]` — showroom detail + in-stock product count

### CS API

- [ ] `POST /api/cs/tickets` — create ticket (+ optional warranty claim)
- [ ] `GET  /api/cs/tickets` — customer's own tickets (paginated)
- [ ] `GET  /api/cs/tickets/[id]` — ticket + messages
- [ ] `POST /api/cs/tickets/[id]/messages` — send a message
- [ ] `POST /api/upload` — upload file, returns CDN URL

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
- [ ] `GET  /api/admin/cs/tickets` — all tickets (agent view, filterable)
- [ ] `PATCH /api/admin/cs/tickets/[id]` — assign agent, change status
- [ ] `GET  /api/admin/vouchers` — all vouchers
- [ ] `POST /api/admin/vouchers` — create voucher
- [ ] `PATCH /api/admin/vouchers/[id]` — edit/deactivate voucher
- [ ] `GET  /api/admin/users` — all users (replace stub in `/api/users`)

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

- [?] **Decide provider:** Supabase Storage (if using Supabase) or Cloudflare R2
- [ ] `POST /api/upload` — validate file type (images: jpg/png/webp, docs: pdf), size limit 10MB, return CDN URL
- [ ] Wire upload to: product images, CS ticket attachments, announcement attachments, showroom logo

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
- [ ] All images through `next/image` (not `<img>`)
- [ ] Rate limiting on auth + upload endpoints
- [ ] CSRF verification (check NextAuth v5 defaults)
- [ ] Input sanitization on all user-submitted text
- [ ] Pagination on all list endpoints (currently returns all rows)
- [ ] Seed script (`prisma/seed.ts`) with realistic sample data for development

---

## Shared Library TODOs

| File                      | Status     | Notes                                              |
| ------------------------- | ---------- | -------------------------------------------------- |
| `src/lib/prisma.ts`       | ✅ Done    | Singleton + pg adapter                             |
| `src/lib/api-response.ts` | ✅ Done    | `ok()`, `err()`, `paginated()`                     |
| `src/lib/geo.ts`          | ✅ Done    | `haversineKm()` for showroom finder                |
| `src/lib/auth.ts`         | ❌ Missing | NextAuth config, session callbacks                 |
| `src/lib/upload.ts`       | ❌ Missing | File upload helper (after storage provider chosen) |
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
- [ ] `npm run dev`
- [ ] Read `AGENTS.md` — **this is not standard Next.js**, read `node_modules/next/dist/docs/` before touching routing or data fetching
