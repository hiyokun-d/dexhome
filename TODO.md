# DexHome — Developer TODO

> **Last updated:** 2026-03-23
>
> This is a living document. Features are organized by priority and role.
> The client brief is still being clarified — items marked `[UNCLEAR]` need follow-up.

---

## Role Overview

| Role | Portal | Access Level |
|---|---|---|
| `CUSTOMER` | `/customer` | Catalog, dashboard, showroom finder, CS |
| `MITRA_USER` | `/mitra` | Own catalog, announcements, community |
| `MITRA_ADMIN` | `/mitra/admin` | Stock, point input, sales, staff |
| `CENTER_ADMIN` | `/admin` | Everything — full platform control |

---

## Phase 0 — Foundation (do this first, unblocks everything)

- [ ] **Set up database** — pick Supabase or Neon (PostgreSQL), add `DATABASE_URL` to `.env`
- [ ] **Implement full Prisma schema** — translate `SCHEMA.md` into `prisma/schema.prisma` (~40 models)
- [ ] **Run first migration** — `prisma migrate dev --name init`
- [ ] **Authentication** — implement auth with role-based access
  - Recommended: NextAuth.js v5 (`next-auth`) or Supabase Auth
  - Session must carry `role`, `userId`, and `profileId` (customer/mitra)
  - Protect routes via middleware (`src/middleware.ts`)
  - Login page per portal or unified `/login?role=customer`
- [ ] **Middleware route protection** — redirect unauthenticated users, enforce role per route prefix
- [ ] **Break down monolithic page files** — `mitra/admin/page.tsx` (11k lines) and `admin/page.tsx` (18k lines) must be split into components before the team can work on them in parallel (see Component Structure section below)
- [ ] **Environment setup** — fill out `.env` from `.env.example`, never commit `.env`

---

## Phase 1 — Core Features

### 1. Dashboard (Customer)

> Membership points, purchase history, vouchers, insurance status

- [ ] `GET /api/customer/dashboard` — aggregate: total points, tier, orders count, active vouchers, insurance items
- [ ] Points balance card with tier badge (Silver / Gold / Platinum)
- [ ] Purchase history list with order status tracking
- [ ] Active vouchers grid (redeemable / expiring soon)
- [ ] Insurance coverage list (per order item)
- [ ] Points history log (`PointTransaction` table) with earn/redeem breakdown
- [ ] `[UNCLEAR]` Does the client want a tier upgrade progress bar?

### 2. Katalog (Customer)

> Browse products; find nearest mitra that stocks the item

- [ ] Product listing page with category filter, price filter, search
- [ ] Product detail page (images, variants, warranty info, mitra availability)
- [ ] **Nearest mitra logic** — when customer views a product, show which showrooms stock it sorted by distance
  - Customer must grant location permission (browser Geolocation API)
  - Fallback: manual city/area filter
  - Backend: `GET /api/catalog/products/[id]/availability?lat=&lng=` — returns `StockPerShowroom[]` sorted by Haversine distance
- [ ] Wishlist (add/remove, persisted to `Wishlist` table)
- [ ] Product reviews section (`ProductReview` table)
- [ ] `[UNCLEAR]` Are products platform-wide or per-mitra catalog? (SCHEMA suggests products belong to a mitra — confirm with client)

### 3. Showroom Finder (Customer)

> Map view of all showrooms + list view; customer can find and navigate to stores

- [ ] **Map integration** — embed interactive map showing all `ACTIVE` mitra locations
  - Recommended lib: `react-leaflet` (OSM, free) or Google Maps JS API (requires API key)
  - Markers for each showroom, click → showroom info popup
- [ ] List view alongside map (toggleable)
- [ ] Showroom detail page: name, address, phone, hours, products in stock, photos
- [ ] Search/filter by city or area
- [ ] "Get directions" link (opens Google Maps / Waze with coordinates)
- [ ] `GET /api/showrooms` — return all active mitra with `lat`, `lng`, `showroom_name`, `city`
- [ ] `[UNCLEAR]` Should map filter by product category? (e.g. "show only showrooms with sofas")

### 4. Customer Service (Customer)

> Submit complaints and warranty claims

- [ ] Create CS ticket form (subject, category: complaint / warranty claim, description, photo upload)
- [ ] Ticket list page — customer sees all their open/resolved tickets
- [ ] Ticket detail / chat view — `CSMessage[]` thread between customer and agent
- [ ] File/image attachment support (upload to storage, store URL in `CSMessage.attachment_url`)
- [ ] Warranty claim flow:
  - Select order item → fill claim form → attach evidence photos
  - Creates `WarrantyClaim` record linked to `CSTicket`
- [ ] Push notification or email on ticket status change `[UNCLEAR - need notification strategy]`

---

## Phase 2 — Mitra Features

### Mitra User (`/mitra`)

- [ ] Announcements list — read status per announcement (`AnnouncementRead` table), mark as read on open
- [ ] My Catalog — show products belonging to this mitra's showroom, quick stock view
- [ ] Community forum — create posts, reply, like (`CommunityPost`, `CommunityReply`, `CommunityLike`)
- [ ] `[UNCLEAR]` Can MITRA_USER edit their catalog or is that MITRA_ADMIN only?

### Mitra Admin (`/mitra/admin`)

- [ ] **Point input** — search customer by phone/email → input points for a transaction
  - Creates `PointTransaction` with `input_by_mitra_id`
  - Validate: customer exists, amount is positive
- [ ] **Stock management** — CRUD for `StockPerShowroom` per product/variant
  - Low stock alerts (quantity ≤ `min_quantity`)
- [ ] **Sales monitoring** — orders fulfilled by this mitra, revenue summary, daily/monthly view
- [ ] Manage showroom profile (address, coordinates, logo, operating hours `[UNCLEAR if in schema]`)
- [ ] Staff management — invite/remove `MITRA_USER` accounts linked to this showroom `[UNCLEAR]`

---

## Phase 3 — Center Admin Features (`/admin`)

- [ ] **Mitra management** — list all mitra, approve/suspend, view per-mitra analytics
- [ ] **Onboarding flow** for new mitra (`ONBOARDING` → `REVIEW` → `ACTIVE`)
- [ ] **Platform analytics dashboard** — GMV, transaction count, new customers, open CS tickets (from `DailyMetric`)
- [ ] **Announcement management** — create/edit/delete announcements, target by mitra status
- [ ] **CS oversight** — view all open tickets, assign agents, escalate
- [ ] **Voucher management** — create promotional vouchers, set rules
- [ ] **Product moderation** — approve/reject products in `REVIEW` status
- [ ] **User management** — view all users, ban, role changes

---

## Technical Backlog

### API Design
- [ ] Standardize API response shape: `{ data, error, meta }` — create a helper `src/lib/api-response.ts`
- [ ] Add request validation (zod recommended) to all POST/PATCH routes
- [ ] Error handling middleware / wrapper for API routes
- [ ] Pagination helper for list endpoints

### Auth & Security
- [ ] CSRF protection (built-in with NextAuth, verify)
- [ ] Rate limiting on auth endpoints
- [ ] Input sanitization on all user-submitted text fields
- [ ] File upload size/type validation

### File Storage
- [ ] Decide storage provider for uploads (product images, CS attachments, showroom logos)
  - Recommended: Supabase Storage or Cloudflare R2 (S3-compatible)
- [ ] Create upload API route: `POST /api/upload` → returns CDN URL

### Real-time (for CS chat)
- [ ] Option A: Supabase Realtime (easy if using Supabase)
- [ ] Option B: Pusher / Ably (third-party, more reliable)
- [ ] Option C: Server-Sent Events (simple, one-way push, good enough for basic notifications)

### Maps
- [ ] Decide map provider before building showroom finder
  - `react-leaflet` + OpenStreetMap = free, no API key
  - Google Maps = requires billing account, better UX
- [ ] Geocoding for mitra address → lat/lng on mitra onboarding

### Performance
- [ ] Implement `loading.tsx` skeleton loaders for all portal sections
- [ ] `error.tsx` boundaries per route segment
- [ ] Image optimization — use `next/image` for all product/showroom images

---

## Component Structure (refactoring needed)

Current page files are monolithic. Split before team scales:

```
src/
├── components/
│   ├── layout/
│   │   ├── Sidebar.tsx          # reusable portal sidebar
│   │   ├── Topbar.tsx           # reusable portal topbar
│   │   └── PortalShell.tsx      # wrapper with sidebar + topbar
│   ├── ui/
│   │   ├── KpiCard.tsx
│   │   ├── DataTable.tsx
│   │   ├── Badge.tsx
│   │   ├── Modal.tsx
│   │   └── FilterTabs.tsx
│   ├── customer/
│   │   ├── PointsCard.tsx
│   │   ├── OrderHistory.tsx
│   │   ├── VoucherGrid.tsx
│   │   └── InsuranceList.tsx
│   ├── mitra/
│   │   ├── AnnouncementList.tsx
│   │   ├── CatalogTable.tsx
│   │   └── CommunityFeed.tsx
│   ├── catalog/
│   │   ├── ProductCard.tsx
│   │   ├── ProductGrid.tsx
│   │   └── AvailabilityMap.tsx
│   ├── showroom/
│   │   ├── ShowroomMap.tsx
│   │   └── ShowroomCard.tsx
│   └── cs/
│       ├── TicketForm.tsx
│       ├── TicketList.tsx
│       └── MessageThread.tsx
├── types/
│   └── index.ts                 # shared TypeScript types (matches schema)
└── lib/
    ├── prisma.ts                # already exists
    ├── api-response.ts          # TODO: standardized response helper
    ├── auth.ts                  # TODO: NextAuth config
    ├── geo.ts                   # TODO: Haversine distance util
    └── upload.ts                # TODO: file upload helper
```

---

## Open Questions for Client

1. **Catalog ownership** — are products owned by DexHome platform (central) or by each mitra individually? Currently schema has `mitra_id` on `Product`.
2. **Ordering flow** — does the customer order through the platform, or does the app just connect them to visit the showroom? `[CRITICAL — affects entire order flow]`
3. **Payment** — if orders happen in-app, what payment gateways? (Midtrans? Xendit?)
4. **Staff roles** — can one showroom have multiple `MITRA_USER` accounts? Who manages them?
5. **Notifications** — email, SMS, in-app push, or all three?
6. **Map provider** — is budget available for Google Maps API, or use free OSM?
7. **Operating hours** — does each showroom have opening hours? Not in current schema.

---

## Dev Environment Checklist (for new team members)

- [ ] Clone repo
- [ ] `npm install` (or `bun install`)
- [ ] Copy `.env.example` → `.env` and fill in values
- [ ] Set up a Supabase or Neon project, get `DATABASE_URL`
- [ ] `npx prisma migrate dev` (after schema is complete)
- [ ] `npm run dev`
- [ ] Read `AGENTS.md` — **this is not standard Next.js**, read the docs in `node_modules/next/dist/docs/`
