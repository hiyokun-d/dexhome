---
name: dexhome_project_overview
description: DexHome platform overview — what the app is, tech stack, portal structure
type: project
---

DexHome is a premium furniture marketplace platform (like Tokopedia but specifically for high-end Indonesian furniture showrooms).

**Why:** Building a multi-portal web app connecting customers, partner showrooms (Mitra), and admins.

**How to apply:** Always keep this multi-role context in mind when working on any feature.

## Tech Stack
- Next.js 16.2.1, React 19, TypeScript
- Tailwind CSS v4 (@import "tailwindcss")
- Prisma (database ORM, DB not yet decided)
- Biome (linter/formatter, replaces ESLint/Prettier)
- animejs (for animations, not yet used)

## Route Structure
- `/` — Landing page portal selector (Server Component)
- `/customer` — Customer Portal (light warm theme: cream/gold/brown)
- `/mitra` — Mitra User Portal (light warm theme)
- `/mitra/admin` — Mitra Admin Portal (dark purple theme)
- `/admin` — Center Admin Portal (dark gold/black theme)

## Design System
- Fonts: Playfair Display (headings) + DM Sans (body), loaded via next/font/google
- CSS vars defined via --font-playfair and --font-dm-sans
- Portal-specific color themes via inline CSS const objects (T = { ... })
- Shared base classes in globals.css: .portal-shell, .portal-sidebar, .portal-topbar, .portal-main, .nav-item, .nav-badge, .fade-up

## Portal Themes
- Customer + Mitra User: Light warm (bg #F5F0E8, brown sidebar #2C1810, gold #C9962A)
- Mitra Admin: Dark purple (bg #13111A, purple accent #8B7CC8)
- Center Admin: Dark gold/black (bg #0F0F12, gold accent #C9962A)

## Business Domain
- Language: Indonesian (Bahasa Indonesia)
- Products: furniture, home decor
- Roles: Customer (buyer), Mitra (showroom partner), Center Admin (platform operator)
- Key features: loyalty points system, vouchers, warranty/insurance, CS ticketing, announcements to mitra, community forum for mitra
