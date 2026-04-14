<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

# DexHome — Project Context for AI Agents

## What is DexHome?

DexHome is a **premium Indonesian furniture marketplace** platform. It connects customers with mitra (showroom partners) across Indonesia. Think of it as a multi-sided platform: customers browse and buy furniture, mitra sell through their physical showrooms, and the central team manages the platform.

## The 4 Roles (Critical — Read This First)

Every user in this system has exactly one role. Routes and features are strictly role-separated.

| Role | Route Prefix | Who They Are |
|---|---|---|
| `CUSTOMER` | `/customer` | End consumers browsing and buying furniture |
| `MITRA_USER` | `/mitra` | Showroom staff — can view catalog and community |
| `MITRA_ADMIN` | `/mitra/admin` | Showroom owner/manager — full control of their showroom |
| `CENTER_ADMIN` | `/admin` | DexHome platform team — controls everything |

**A `MITRA_ADMIN` manages one showroom and its `MITRA_USER` staff. A `CENTER_ADMIN` has no showroom — they manage the entire platform.**

## Core Features (Client Requirements)

1. **Dashboard** (Customer) — membership points, tier status (Silver/Gold/Platinum), purchase history, active vouchers, insurance coverage
2. **Katalog** (Customer) — product catalog with nearest-mitra availability. When a customer views a product, they see which showrooms near them stock it (uses browser Geolocation + Haversine distance)
3. **Showroom Finder** (Customer) — interactive map showing all active mitra showrooms; search by city; click for showroom details and directions
4. **Customer Service** (Customer) — submit complaints and warranty claims; chat thread with DexHome agents; file/image attachments

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) — see Breaking Changes below |
| Language | TypeScript 5 (strict mode) |
| Styling | Tailwind CSS v4 |
| ORM | Prisma 7 with `@prisma/adapter-pg` |
| Database | PostgreSQL (Supabase or Neon — not yet set up) |
| Linter | Biome 2 (`npm run lint`, `npm run format`) |
| Animation | animejs 4 |

## File Structure (Key Paths)

```
src/
├── app/                        # Next.js App Router — all routes live here
│   ├── page.tsx                # Landing / portal selector
│   ├── customer/page.tsx       # Customer portal (UI mockup — needs API wiring)
│   ├── mitra/page.tsx          # Mitra user portal (UI mockup)
│   ├── mitra/admin/page.tsx    # Mitra admin portal (11k lines — split into components)
│   ├── admin/page.tsx          # Center admin portal (18k lines — split into components)
│   └── api/                    # API routes
├── components/                 # Shared UI components (currently empty stubs — fill these)
│   ├── layout/                 # Sidebar, Topbar, PortalShell
│   ├── ui/                     # KpiCard, DataTable, Badge, Modal, FilterTabs
│   ├── customer/               # PointsCard, OrderHistory, VoucherGrid, InsuranceList
│   ├── mitra/                  # AnnouncementList, CatalogTable, CommunityFeed
│   ├── catalog/                # ProductCard, ProductGrid, AvailabilityMap
│   ├── showroom/               # ShowroomMap, ShowroomCard
│   └── cs/                     # TicketForm, TicketList, MessageThread
├── lib/
│   ├── prisma.ts               # Prisma client singleton
│   ├── api-response.ts         # Standardized ok() / err() / paginated() helpers
│   └── geo.ts                  # haversineKm() — distance calculation for showroom finder
└── types/
    └── index.ts                # All shared TypeScript types (mirrors SCHEMA.md)
```

## Database Schema

The full intended schema is in `SCHEMA.md` (~40 tables). The current `prisma/schema.prisma` only has a placeholder `User` model — **it needs to be fully implemented before any API work can happen**.

Key entities: `User`, `CustomerProfile`, `MitraProfile`, `Product`, `Order`, `PointTransaction`, `Voucher`, `WarrantyClaim`, `CSTicket`, `Announcement`, `CommunityPost`

## Design System

**Color themes are portal-specific — do not mix them:**
- Customer & Mitra User: light warm (cream `#F5F0E8`, brown `#2C1810`, gold `#C9962A`)
- Mitra Admin: dark purple (`#13111A` bg, `#8B7CC8` accent)
- Center Admin: dark gold/black (`#0F0F12` bg, `#C9962A` accent)

**Fonts:** Playfair Display (headings) + DM Sans (body). CSS vars: `--font-playfair`, `--font-dm-sans`.

**Shared CSS classes** are in `src/app/globals.css`: `.portal-shell`, `.portal-sidebar`, `.portal-topbar`, `.portal-main`, `.kpi-card`, `.data-table`, `.filter-tabs`, `.fade-up`, etc.

## API Conventions

- All API responses use the shape `{ data, error, meta? }` — use helpers from `src/lib/api-response.ts`
- Use `zod` for request body validation in POST/PATCH routes
- Authentication will use NextAuth.js v5 — session carries `{ id, email, role, profileId }`
- Route protection via `src/middleware.ts` (not yet created)

## What's NOT Built Yet (as of 2026-03-23)

- Authentication (no login pages, no session)
- Real database (Prisma schema incomplete)
- API routes beyond basic `/api/users` CRUD
- Component extraction (page files are monolithic, need to be split)
- Map integration (showroom finder is UI-only)
- CS ticket system
- Point input flow (mitra admin)
- Any real-time features

## Open Questions (Do Not Assume — Ask or Check TODO.md)

- Does ordering happen in-app, or does the app just connect customers to visit the showroom?
- Which map provider: Google Maps (paid) or OpenStreetMap (free)?
- Which auth strategy: NextAuth.js, Supabase Auth, or custom JWT?
- Are products platform-wide or per-mitra?

## Breaking Changes in This Next.js Version

Before writing any Next.js-specific code (routing, data fetching, middleware, caching, etc.), read the relevant guide in `node_modules/next/dist/docs/`. Do not rely on training data for Next.js APIs — they may have changed.
