# DexHome API Reference

## Core Concepts

### Response Shape

Every endpoint returns the same envelope:

```json
{ "data": <payload | null>, "error": <string | null>, "meta": <pagination | undefined> }
```

Use `data` on success, `error` on failure. Never both populated at once.

Helper functions in `src/lib/api-response.ts`:
- `ok(data, status?)` — success, status defaults to 200
- `err(message, status?)` — failure, status defaults to 400
- `paginated(data, total, page, perPage)` — adds `meta.page`, `meta.perPage`, `meta.total`

### Auth Status

> **No auth is wired yet.** Every route that needs a user identity takes it as a query param or body field (`customerId`, `mitraId`, `agentId`). Once NextAuth.js v5 is added, all `TODO: replace ... with session.profileId` comments mark what needs to change.

### Dev Endpoints

Three endpoints exist **only in development** (`NODE_ENV !== 'production'`) to supply real IDs for testing without a login flow:

| Endpoint | Returns |
|---|---|
| `GET /api/dev/customers` | CustomerProfile list with id, fullName, email, totalPoints |
| `GET /api/dev/agents` | CENTER_ADMIN users with id, email |
| `GET /api/dev/mitras` | MitraProfile list with id, showroomName, mitraCode, city |

These are called on mount in every page that needs an identity. The picker dropdown in the UI topbar is populated from these responses.

---

## Customer APIs

### Dashboard

```
GET /api/customer/dashboard?customerId=<uuid>
```

Returns the full customer dashboard in one call — profile, recent orders, active vouchers, point history.

**Response `data`:**
```json
{
  "id": "uuid",
  "fullName": "string",
  "membershipTier": "SILVER | GOLD | PLATINUM",
  "totalPoints": 1250,
  "tierExpiresAt": "ISO date | null",
  "avatarUrl": "url | null",
  "orders": [/* 5 most recent — see Orders */],
  "voucherClaims": [/* active, unused, non-expired — see Vouchers */],
  "pointTransactions": [/* 5 most recent */],
  "_count": { "orders": 12, "reviews": 4, "warrantyClaims": 1 }
}
```

**Point transaction types:** `EARN` | `REDEEM` | `BONUS` | `EXPIRE` | `REFUND`

---

### Orders

```
GET /api/customer/orders?customerId=<uuid>&page=1&limit=10&status=<OrderStatus>
```

Paginated order history. `status` filter is optional.

**Order statuses:** `PENDING` | `PROCESSING` | `SHIPPED` | `DELIVERED` | `COMPLETED` | `CANCELLED`

**Response `data[]`:**
```json
{
  "id": "uuid",
  "orderNumber": "DXH-XXXX-XXXX",
  "status": "COMPLETED",
  "totalAmount": 8500000,
  "discountAmount": 0,
  "pointsEarned": 850,
  "pointsUsed": 0,
  "paymentMethod": "string",
  "createdAt": "ISO date",
  "mitra": { "showroomName": "...", "city": "...", "logoUrl": "url | null" },
  "items": [
    {
      "quantity": 1,
      "unitPrice": 8500000,
      "subtotal": 8500000,
      "product": { "id": "uuid", "name": "...", "images": [{ "url": "..." }] },
      "variant": { "size": "...", "color": "...", "colorHex": "#..." } | null
    }
  ]
}
```

**Pagination meta:** `{ page, perPage, total }`

---

### Vouchers

```
GET /api/customer/vouchers?customerId=<uuid>&includeUsed=false
```

Returns active (unused, non-expired) voucher claims. Pass `includeUsed=true` to include redeemed ones.

**Voucher types:** `FIXED_DISCOUNT` | `PERCENT_DISCOUNT` | `FREE_SHIPPING` | `CASHBACK`

**Response `data[]`:**
```json
{
  "id": "uuid",
  "usedAt": "ISO date | null",
  "orderId": "uuid | null",
  "voucher": {
    "id": "uuid",
    "code": "FLASH40",
    "name": "Flash Sale April",
    "type": "PERCENT_DISCOUNT",
    "value": 40,
    "minPurchase": 1000000,
    "pointsCost": 0,
    "validFrom": "ISO date",
    "validUntil": "ISO date"
  }
}
```

---

### Wishlist

```
GET  /api/customer/wishlist?customerId=<uuid>
POST /api/customer/wishlist
```

`GET` returns full wishlist with product details.

`POST` **toggles** — sends one request for both add and remove. Returns `{ "wishlisted": true | false }`.

**POST body:**
```json
{ "customerId": "uuid", "productId": "uuid" }
```

---

### Customer Service (CS)

**List / create tickets:**
```
GET  /api/customer/cs?customerId=<uuid>&page=1&status=<TicketStatus>
POST /api/customer/cs
```

`POST` body:
```json
{ "customerId": "uuid", "subject": "min 5 chars" }
```

Creates ticket with auto-generated number `TKT-XXXXXX`, status `OPEN`, priority `NORMAL`.

**Ticket statuses:** `OPEN` | `IN_PROGRESS` | `WAITING_CUSTOMER` | `RESOLVED` | `CLOSED`

---

**Get single ticket + messages:**
```
GET /api/customer/cs/:id?customerId=<uuid>
```

Returns ticket with full message thread.

---

**Send message:**
```
POST /api/customer/cs/:id/message
```

Body:
```json
{ "customerId": "uuid", "content": "string", "attachmentUrl": "url | null" }
```

Returns the new message. `senderRole` will be `CUSTOMER`.

---

## Product / Catalog APIs

### Product List

```
GET /api/item?page=1&limit=12&category=<slug>
```

Paginated product list. `category` filter uses slug (e.g. `sofa`, `kursi`). Default limit 12, max 48.

**Response `data[]`:**
```json
{
  "id": "uuid",
  "name": "Sofa Modular Scandinavian",
  "price": 8500000,
  "originalPrice": 10000000 | null,
  "pointsPerTxn": 850,
  "memberDiscountPct": 5,
  "avgRating": 4.8 | null,
  "reviewCount": 23,
  "mitra": { "showroomName": "Homera Studio" },
  "category": { "name": "Sofa", "icon": "🛋️" },
  "images": [{ "url": "https://..." }]
}
```

---

### Single Product

```
GET /api/item/:id
```

Full product detail — description, all images, all variants, warranty, insurance flag.

---

### Product Availability (Showroom Finder)

```
GET /api/item/:id/availability?lat=<float>&lng=<float>
```

Returns which showrooms stock this product, optionally sorted by distance from user coordinates.

**Response `data[]`:**
```json
{
  "mitraId": "uuid",
  "showroomName": "...",
  "city": "...",
  "latitude": -6.2,
  "longitude": 106.8,
  "quantity": 12,
  "distanceKm": 3.4
}
```

Distance is only included when `lat` + `lng` are provided. Sorted nearest-first.

---

### Categories

```
GET /api/item/category             → all categories
GET /api/item/category?slug=sofa   → category info + products in that category
```

---

### Showrooms

```
GET /api/showrooms?city=<name>
```

All `ACTIVE` mitra showrooms. `city` filter is optional, case-insensitive partial match.

Used by customer showroom finder page. Distance calculation is done **client-side** via `haversineKm()` in `src/lib/geo.ts` — the API just returns raw lat/lng.

**Response `data[]`:**
```json
{
  "id": "uuid",
  "showroomName": "Homera Studio",
  "address": "Jl. ...",
  "city": "Jakarta",
  "latitude": -6.2,
  "longitude": 106.8,
  "logoUrl": "url | null",
  "_count": { "products": 24 }
}
```

---

## Mitra User APIs

All mitra routes require `mitraId` (MitraProfile UUID).

### Announcements

```
GET  /api/mitra/announcements?mitraId=<uuid>&category=<cat>
POST /api/mitra/announcements/:id/read    body: { mitraId }
```

`GET` returns announcements published and targeted to this mitra. Each item includes `isRead: boolean`.

`category` filter values: `PROMO` | `SYSTEM` | `EVENT` | `POLICY` | `URGENT`

Announcements expand to show `content` (full text) and `attachmentUrl` if present.

`POST .../read` marks as read via upsert — calling it multiple times is safe.

---

### Mitra Catalog

```
GET /api/mitra/catalog?mitraId=<uuid>
```

Products belonging to this mitra's showroom, with stock levels.

**Response `data[]`:**
```json
{
  "id": "uuid",
  "sku": "HMS-SOFA-001",
  "name": "...",
  "price": 8500000,
  "originalPrice": null,
  "status": "ACTIVE | DRAFT | REVIEW | INACTIVE",
  "category": { "name": "Sofa" },
  "images": [{ "url": "..." }],
  "stockItems": [{ "quantity": 28, "minQuantity": 10 }],
  "_count": { "orderItems": 14 }
}
```

---

### Community

```
GET  /api/mitra/community?mitraId=<uuid>
POST /api/mitra/community                   body: { mitraId, content, tags[] }
POST /api/mitra/community/:id/like          body: { mitraId }
POST /api/mitra/community/:id/reply         body: { mitraId, content }
```

`GET` returns posts with `likedByMe: boolean` and full `replies[]` array.

Like toggle: single endpoint for both add and remove. Returns `{ "liked": true | false }`. Uses optimistic UI — revert on failure.

Post `tags` is a JSON array of strings (free-form).

---

## Mitra Admin APIs

All routes require `mitraId`.

### Admin Dashboard

```
GET /api/mitra/admin/dashboard?mitraId=<uuid>&days=30
```

`days` defaults to 30. Drives KPI cards and recent orders table.

**Response `data`:**
```json
{
  "gmv": 148000000,
  "totalOrders": 84,
  "avgRating": 4.9,
  "reviewCount": 128,
  "todayPointInputs": 3,
  "stockAlerts": [
    { "quantity": 2, "minQuantity": 5, "product": { "id": "uuid", "name": "...", "sku": "..." } }
  ],
  "recentOrders": [/* up to 10, same shape as customer orders */]
}
```

`stockAlerts` = items where `quantity <= minQuantity`. GMV counts only `COMPLETED` + `DELIVERED` orders.

---

### Stock Management

```
GET   /api/mitra/admin/stock?mitraId=<uuid>
PATCH /api/mitra/admin/stock
```

`GET` returns all `StockPerShowroom` rows for this mitra, sorted by quantity ascending (lowest stock first).

`PATCH` body:
```json
{ "mitraId": "uuid", "stockItemId": "uuid", "quantity": 15 }
```

Returns the updated stock row. UI uses inline edit — shows input field on row, Save/Cancel buttons.

---

### Point Input

```
GET  /api/mitra/admin/points?mitraId=<uuid>
POST /api/mitra/admin/points
```

`GET` returns today's input summary:
```json
{ "todayCount": 3, "todayPoints": 1640, "dailyLimit": 10 }
```

`POST` body:
```json
{
  "mitraId": "uuid",
  "customerId": "uuid",
  "transactionAmount": 8500000,
  "description": "Pembelian Sofa - DXH-2603-0091",
  "referenceId": "uuid | omit"
}
```

**Rules enforced server-side:**
- `transactionAmount` minimum: **Rp 500.000**
- Daily limit: **10 inputs per mitra per day** (returns `429` when exceeded)
- Points formula: `floor(transactionAmount / 10_000)` — 1 point per Rp 10.000
- Transaction: creates `PointTransaction` (type `EARN`) + increments `CustomerProfile.totalPoints` atomically

**Response `data`:**
```json
{ "id": "uuid", "amount": 850, "pointsAwarded": 850, "createdAt": "ISO date" }
```

---

## Admin CS APIs

All admin CS routes are for `CENTER_ADMIN` role. No auth gating yet.

### Ticket List

```
GET /api/admin/cs?page=1&status=<TicketStatus>&search=<text>
```

`search` matches against `subject`, `ticketNumber`, and customer `fullName` (case-insensitive).
Sorted: open tickets first, then by most recently updated.

---

### Single Ticket + Messages

```
GET   /api/admin/cs/:id
PATCH /api/admin/cs/:id     body: { status?, priority?, agentId? }
```

`PATCH` updates ticket status, priority, or assigned agent. All fields optional.

---

### Agent Reply

```
POST /api/admin/cs/:id/reply
```

Body:
```json
{ "agentId": "uuid", "content": "string", "attachmentUrl": "url | null" }
```

`senderRole` will be `AGENT`.

---

## Error Reference

| HTTP | Meaning |
|---|---|
| `400` | Missing required param or validation failure — check `error` field |
| `404` | Resource not found |
| `429` | Rate limit exceeded (point input daily cap) |
| `403` | Forbidden — dev-only endpoint called in production |
| `500` | Server error — check server logs |

---

## Not Yet Built

- `POST /api/customer/orders` — order creation flow
- `POST /api/customer/vouchers/redeem` — redeem points for voucher
- `GET /api/customer/profile` — update avatar/phone
- `GET /api/mitra/admin/orders` — full order management for mitra
- Announcement creation endpoints (centralAdmin)
- Auth middleware (`src/middleware.ts`) — replaces all `?customerId=` params with session
