---
name: dexhome_schema_status
description: Database schema status and recommendation for DexHome
type: project
---

Full schema documented in SCHEMA.md at project root.

**Why:** Database not decided yet — schema written database-agnostic.

**How to apply:** Use SCHEMA.md as reference when implementing API routes or Prisma schema.

## Key Entities
User, CustomerProfile, MitraProfile, Category, Product, ProductVariant, StockPerShowroom, Order, OrderItem, PointTransaction, Voucher, VoucherClaim, WarrantyClaim, InsuranceCoverage, Announcement, AnnouncementRead, CSTicket, CSMessage, CommunityPost, CommunityReply, Wishlist, ProductReview, DailyMetric

## DB Recommendation
PostgreSQL via Supabase or Neon (both serverless, free tier, great Prisma support). User hasn't decided yet.
