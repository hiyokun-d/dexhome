# DexHome — Database Schema

> Database-agnostic schema design. Compatible with PostgreSQL, MySQL, or MongoDB.
> Once you decide the database, the Prisma schema (`prisma/schema.prisma`) can be written from this.

---

## Users & Auth

### `User`
| Column | Type | Notes |
|---|---|---|
| id | uuid | PK |
| email | string | unique |
| phone | string | unique, for customer lookup |
| password_hash | string | |
| role | enum | `CUSTOMER`, `MITRA_USER`, `MITRA_ADMIN`, `CENTER_ADMIN` |
| created_at | timestamp | |
| updated_at | timestamp | |

### `CustomerProfile`
| Column | Type | Notes |
|---|---|---|
| id | uuid | PK |
| user_id | uuid | FK → User |
| full_name | string | |
| membership_tier | enum | `SILVER`, `GOLD`, `PLATINUM` |
| total_points | int | current active points |
| tier_expires_at | timestamp | when current tier expires |
| avatar_url | string | nullable |

### `MitraProfile`
| Column | Type | Notes |
|---|---|---|
| id | uuid | PK |
| user_id | uuid | FK → User |
| mitra_code | string | unique, e.g. `MTR-0001` |
| showroom_name | string | |
| address | string | |
| city | string | |
| latitude | float | for map |
| longitude | float | for map |
| status | enum | `ACTIVE`, `REVIEW`, `ONBOARDING`, `SUSPENDED` |
| verified_at | timestamp | nullable |
| logo_url | string | nullable |

---

## Products & Catalog

### `Category`
| Column | Type | Notes |
|---|---|---|
| id | uuid | PK |
| name | string | e.g. Ruang Tamu |
| slug | string | unique |
| icon | string | emoji or icon ref |
| parent_id | uuid | nullable, for subcategories |

### `Product`
| Column | Type | Notes |
|---|---|---|
| id | uuid | PK |
| sku | string | unique |
| name | string | |
| description | text | |
| category_id | uuid | FK → Category |
| mitra_id | uuid | FK → MitraProfile (brand/seller) |
| price | int | in IDR (cents or full Rp) |
| original_price | int | nullable, for strikethrough |
| member_discount_pct | int | % discount for members |
| points_per_txn | int | points awarded on purchase |
| warranty_months | int | |
| warranty_type | enum | `STORE`, `MANUFACTURER`, `DEXHOME` |
| insurance_available | bool | |
| weight_kg | float | |
| dimensions_cm | string | "P×L×T" |
| status | enum | `ACTIVE`, `REVIEW`, `INACTIVE`, `DRAFT` |
| created_at | timestamp | |
| updated_at | timestamp | |

### `ProductImage`
| Column | Type | Notes |
|---|---|---|
| id | uuid | PK |
| product_id | uuid | FK → Product |
| url | string | |
| order | int | display order (0 = primary) |

### `ProductVariant`
| Column | Type | Notes |
|---|---|---|
| id | uuid | PK |
| product_id | uuid | FK → Product |
| size | string | nullable, e.g. "3 Dudukan" |
| color | string | nullable |
| color_hex | string | nullable |
| price_delta | int | price adjustment from base (can be negative) |
| sku_suffix | string | appended to product SKU |

### `StockPerShowroom`
| Column | Type | Notes |
|---|---|---|
| id | uuid | PK |
| product_id | uuid | FK → Product |
| variant_id | uuid | FK → ProductVariant, nullable |
| mitra_id | uuid | FK → MitraProfile |
| quantity | int | |
| min_quantity | int | alert threshold |
| updated_at | timestamp | |

---

## Orders & Transactions

### `Order`
| Column | Type | Notes |
|---|---|---|
| id | uuid | PK |
| order_number | string | unique, e.g. `DXH-2603-0091` |
| customer_id | uuid | FK → CustomerProfile |
| mitra_id | uuid | FK → MitraProfile (fulfilling showroom) |
| status | enum | `PENDING`, `PROCESSING`, `SHIPPED`, `DELIVERED`, `COMPLETED`, `CANCELLED`, `CLAIM` |
| total_amount | int | in IDR |
| discount_amount | int | |
| voucher_id | uuid | nullable, FK → Voucher |
| points_earned | int | |
| points_used | int | |
| payment_method | string | |
| installment_provider | string | nullable (Kredivo, Akulaku, etc.) |
| shipping_address | json | snapshot at time of order |
| notes | text | |
| created_at | timestamp | |
| updated_at | timestamp | |

### `OrderItem`
| Column | Type | Notes |
|---|---|---|
| id | uuid | PK |
| order_id | uuid | FK → Order |
| product_id | uuid | FK → Product |
| variant_id | uuid | nullable, FK → ProductVariant |
| quantity | int | |
| unit_price | int | snapshot at time of order |
| subtotal | int | |

---

## Points & Vouchers

### `PointTransaction`
| Column | Type | Notes |
|---|---|---|
| id | uuid | PK |
| customer_id | uuid | FK → CustomerProfile |
| type | enum | `EARN`, `REDEEM`, `BONUS`, `EXPIRE`, `REFUND` |
| amount | int | positive = earn, negative = redeem |
| reference_type | string | `ORDER`, `VOUCHER`, `MANUAL`, `CHECKIN` |
| reference_id | uuid | nullable, FK to relevant entity |
| description | string | |
| input_by_mitra_id | uuid | nullable, FK → MitraProfile (for manual input) |
| expires_at | timestamp | nullable |
| created_at | timestamp | |

### `Voucher`
| Column | Type | Notes |
|---|---|---|
| id | uuid | PK |
| code | string | unique |
| name | string | |
| type | enum | `FIXED_DISCOUNT`, `PERCENT_DISCOUNT`, `FREE_SHIPPING`, `CASHBACK` |
| value | int | amount or percentage |
| min_purchase | int | |
| max_uses | int | nullable = unlimited |
| uses_per_user | int | default 1 |
| points_cost | int | 0 = free / promotional |
| valid_from | timestamp | |
| valid_until | timestamp | |
| created_at | timestamp | |

### `VoucherClaim`
| Column | Type | Notes |
|---|---|---|
| id | uuid | PK |
| voucher_id | uuid | FK → Voucher |
| customer_id | uuid | FK → CustomerProfile |
| used_at | timestamp | nullable (null = claimed but not used) |
| order_id | uuid | nullable, FK → Order |

---

## Warranty & Insurance

### `WarrantyClaim`
| Column | Type | Notes |
|---|---|---|
| id | uuid | PK |
| order_item_id | uuid | FK → OrderItem |
| customer_id | uuid | FK → CustomerProfile |
| status | enum | `SUBMITTED`, `REVIEWING`, `APPROVED`, `REJECTED`, `RESOLVED` |
| description | text | |
| evidence_urls | json | array of image/video URLs |
| resolved_at | timestamp | nullable |
| created_at | timestamp | |

### `InsuranceCoverage`
| Column | Type | Notes |
|---|---|---|
| id | uuid | PK |
| order_item_id | uuid | FK → OrderItem |
| provider | string | |
| policy_number | string | |
| coverage_amount | int | |
| expires_at | timestamp | |
| status | enum | `ACTIVE`, `CLAIMED`, `EXPIRED` |

---

## Announcements

### `Announcement`
| Column | Type | Notes |
|---|---|---|
| id | uuid | PK |
| title | string | |
| content | text | |
| category | enum | `PROMO`, `SYSTEM`, `EVENT`, `POLICY`, `URGENT` |
| priority | enum | `NORMAL`, `IMPORTANT`, `URGENT` |
| target | enum | `ALL_MITRA`, `VERIFIED_MITRA`, `SPECIFIC` |
| target_mitra_ids | json | nullable, array of mitra IDs for SPECIFIC |
| attachment_url | string | nullable |
| published_at | timestamp | |
| created_by | uuid | FK → User |
| created_at | timestamp | |

### `AnnouncementRead`
| Column | Type | Notes |
|---|---|---|
| id | uuid | PK |
| announcement_id | uuid | FK → Announcement |
| mitra_id | uuid | FK → MitraProfile |
| read_at | timestamp | |

---

## Customer Service

### `CSTicket`
| Column | Type | Notes |
|---|---|---|
| id | uuid | PK |
| ticket_number | string | unique, e.g. `TKT-0042` |
| customer_id | uuid | FK → CustomerProfile |
| assigned_agent_id | uuid | nullable, FK → User (CENTER_ADMIN) |
| subject | string | |
| status | enum | `OPEN`, `ANSWERED`, `RESOLVED`, `CLOSED` |
| priority | enum | `NORMAL`, `HIGH`, `URGENT` |
| created_at | timestamp | |
| updated_at | timestamp | |
| resolved_at | timestamp | nullable |

### `CSMessage`
| Column | Type | Notes |
|---|---|---|
| id | uuid | PK |
| ticket_id | uuid | FK → CSTicket |
| sender_id | uuid | FK → User |
| sender_role | enum | `CUSTOMER`, `AGENT` |
| content | text | |
| attachment_url | string | nullable |
| created_at | timestamp | |

---

## Community

### `CommunityPost`
| Column | Type | Notes |
|---|---|---|
| id | uuid | PK |
| mitra_id | uuid | FK → MitraProfile |
| content | text | |
| tags | json | array of strings |
| likes_count | int | denormalized |
| replies_count | int | denormalized |
| status | enum | `ACTIVE`, `HIDDEN`, `DELETED` |
| created_at | timestamp | |

### `CommunityReply`
| Column | Type | Notes |
|---|---|---|
| id | uuid | PK |
| post_id | uuid | FK → CommunityPost |
| mitra_id | uuid | FK → MitraProfile |
| content | text | |
| created_at | timestamp | |

### `CommunityLike`
| Column | Type | Notes |
|---|---|---|
| id | uuid | PK |
| post_id | uuid | FK → CommunityPost |
| mitra_id | uuid | FK → MitraProfile |
| created_at | timestamp | |

---

## Wishlist & Reviews

### `Wishlist`
| Column | Type | Notes |
|---|---|---|
| id | uuid | PK |
| customer_id | uuid | FK → CustomerProfile |
| product_id | uuid | FK → Product |
| created_at | timestamp | |

### `ProductReview`
| Column | Type | Notes |
|---|---|---|
| id | uuid | PK |
| order_item_id | uuid | FK → OrderItem |
| customer_id | uuid | FK → CustomerProfile |
| product_id | uuid | FK → Product |
| rating | int | 1–5 |
| comment | text | nullable |
| images | json | array of URLs |
| verified_purchase | bool | |
| created_at | timestamp | |

---

## Analytics (optional — can be event-sourced separately)

### `DailyMetric`
| Column | Type | Notes |
|---|---|---|
| id | uuid | PK |
| date | date | |
| gmv | bigint | total gross merchandise value |
| transaction_count | int | |
| new_customers | int | |
| active_customers | int | |
| open_tickets | int | |
| avg_response_time_minutes | float | |

---

## Key Relationships Summary

```
User ──────────────── CustomerProfile
                 └─── MitraProfile (MITRA_USER or MITRA_ADMIN)

Product ───────────── Category
        └──────────── MitraProfile (brand/seller)
        └──────────── ProductImage (1-N)
        └──────────── ProductVariant (1-N)
        └──────────── StockPerShowroom (per mitra location)

Order ──────────────── CustomerProfile
      └─────────────── MitraProfile (fulfiller)
      └─────────────── OrderItem (1-N)
      └─────────────── Voucher (optional)

PointTransaction ───── CustomerProfile
                  └─── MitraProfile (input_by)

Announcement ──────── User (center admin creator)
             └─────── AnnouncementRead (1-N, one per mitra)

CSTicket ──────────── CustomerProfile
         └──────────── CSMessage (1-N)
         └──────────── User (assigned agent)
```

---

## Database Recommendations

| Database | Pros | Cons | Best For |
|---|---|---|---|
| **PostgreSQL** | ACID, JSON support, full-text search, great for relations | More setup | ✅ Recommended — handles all entities well |
| **MySQL** | Widely hosted, familiar | Weaker JSON, older tooling | Good fallback if team knows it |
| **MongoDB** | Flexible schema, easy to start | Weak joins, eventual consistency | Only if schema changes a lot |
| **PlanetScale** (MySQL) | Serverless, branching | No FK enforcement | Good for teams wanting zero-ops |
| **Supabase** (PostgreSQL) | Open-source Firebase alt, built-in auth, realtime | Pricing at scale | ✅ Great starting point |
| **Neon** (PostgreSQL) | Serverless Postgres, Next.js-friendly | Newer | ✅ Good for Next.js + Prisma setup |

> **Recommendation:** Start with **Supabase** or **Neon** (both serverless PostgreSQL, free tier available, great Prisma support). Migrate to dedicated Postgres later if needed.
