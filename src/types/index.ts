// DexHome — Shared TypeScript Types
// Mirrors the database schema in SCHEMA.md.
// These are plain types (not Prisma-generated) for use in components and API routes.
// Once Prisma schema is fully implemented, prefer Prisma's generated types where possible.

// =============================================================================
// Enums
// =============================================================================

export type UserRole = "CUSTOMER" | "MITRA_USER" | "MITRA_ADMIN" | "CENTER_ADMIN";

export type MembershipTier = "SILVER" | "GOLD" | "PLATINUM";

export type MitraStatus = "ACTIVE" | "REVIEW" | "ONBOARDING" | "SUSPENDED";

export type ProductStatus = "ACTIVE" | "REVIEW" | "INACTIVE" | "DRAFT";

export type WarrantyType = "STORE" | "MANUFACTURER" | "DEXHOME";

export type OrderStatus =
  | "PENDING"
  | "PROCESSING"
  | "SHIPPED"
  | "DELIVERED"
  | "COMPLETED"
  | "CANCELLED"
  | "CLAIM";

export type PointTransactionType = "EARN" | "REDEEM" | "BONUS" | "EXPIRE" | "REFUND";

export type VoucherType = "FIXED_DISCOUNT" | "PERCENT_DISCOUNT" | "FREE_SHIPPING" | "CASHBACK";

export type WarrantyClaimStatus =
  | "SUBMITTED"
  | "REVIEWING"
  | "APPROVED"
  | "REJECTED"
  | "RESOLVED";

export type InsuranceStatus = "ACTIVE" | "CLAIMED" | "EXPIRED";

export type AnnouncementCategory = "PROMO" | "SYSTEM" | "EVENT" | "POLICY" | "URGENT";

export type AnnouncementPriority = "NORMAL" | "IMPORTANT" | "URGENT";

export type AnnouncementTarget = "ALL_MITRA" | "VERIFIED_MITRA" | "SPECIFIC";

export type CSTicketStatus = "OPEN" | "ANSWERED" | "RESOLVED" | "CLOSED";

export type CSTicketPriority = "NORMAL" | "HIGH" | "URGENT";

export type CommunityPostStatus = "ACTIVE" | "HIDDEN" | "DELETED";

// =============================================================================
// Users & Auth
// =============================================================================

export interface User {
  id: string;
  email: string;
  phone: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export interface CustomerProfile {
  id: string;
  userId: string;
  fullName: string;
  membershipTier: MembershipTier;
  totalPoints: number;
  tierExpiresAt: Date | null;
  avatarUrl: string | null;
}

export interface MitraProfile {
  id: string;
  userId: string;
  mitraCode: string;
  showroomName: string;
  address: string;
  city: string;
  latitude: number;
  longitude: number;
  status: MitraStatus;
  verifiedAt: Date | null;
  logoUrl: string | null;
}

// Session shape — what's available in auth session
export interface SessionUser {
  id: string;
  email: string;
  role: UserRole;
  profileId: string; // CustomerProfile.id or MitraProfile.id
  name: string;
}

// =============================================================================
// Products & Catalog
// =============================================================================

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  parentId: string | null;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  description: string;
  categoryId: string;
  mitraId: string;
  price: number;
  originalPrice: number | null;
  memberDiscountPct: number;
  pointsPerTxn: number;
  warrantyMonths: number;
  warrantyType: WarrantyType;
  insuranceAvailable: boolean;
  weightKg: number;
  dimensionsCm: string;
  status: ProductStatus;
  createdAt: Date;
  updatedAt: Date;
  // relations (populated when needed)
  images?: ProductImage[];
  variants?: ProductVariant[];
  category?: Category;
  mitra?: MitraProfile;
}

export interface ProductImage {
  id: string;
  productId: string;
  url: string;
  order: number;
}

export interface ProductVariant {
  id: string;
  productId: string;
  size: string | null;
  color: string | null;
  colorHex: string | null;
  priceDelta: number;
  skuSuffix: string;
}

export interface StockPerShowroom {
  id: string;
  productId: string;
  variantId: string | null;
  mitraId: string;
  quantity: number;
  minQuantity: number;
  updatedAt: Date;
}

// Catalog product with distance — used in showroom finder / availability
export interface ProductAvailability extends StockPerShowroom {
  mitra: MitraProfile;
  distanceKm?: number;
}

// =============================================================================
// Orders & Transactions
// =============================================================================

export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  mitraId: string;
  status: OrderStatus;
  totalAmount: number;
  discountAmount: number;
  voucherId: string | null;
  pointsEarned: number;
  pointsUsed: number;
  paymentMethod: string;
  installmentProvider: string | null;
  shippingAddress: ShippingAddressSnapshot;
  notes: string;
  createdAt: Date;
  updatedAt: Date;
  // relations
  items?: OrderItem[];
  mitra?: MitraProfile;
}

export interface ShippingAddressSnapshot {
  fullName: string;
  phone: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  variantId: string | null;
  quantity: number;
  unitPrice: number;
  subtotal: number;
  // relations
  product?: Product;
  variant?: ProductVariant;
}

// =============================================================================
// Points & Vouchers
// =============================================================================

export interface PointTransaction {
  id: string;
  customerId: string;
  type: PointTransactionType;
  amount: number;
  referenceType: "ORDER" | "VOUCHER" | "MANUAL" | "CHECKIN";
  referenceId: string | null;
  description: string;
  inputByMitraId: string | null;
  expiresAt: Date | null;
  createdAt: Date;
}

export interface Voucher {
  id: string;
  code: string;
  name: string;
  type: VoucherType;
  value: number;
  minPurchase: number;
  maxUses: number | null;
  usesPerUser: number;
  pointsCost: number;
  validFrom: Date;
  validUntil: Date;
  createdAt: Date;
}

export interface VoucherClaim {
  id: string;
  voucherId: string;
  customerId: string;
  usedAt: Date | null;
  orderId: string | null;
  voucher?: Voucher;
}

// =============================================================================
// Warranty & Insurance
// =============================================================================

export interface WarrantyClaim {
  id: string;
  orderItemId: string;
  customerId: string;
  status: WarrantyClaimStatus;
  description: string;
  evidenceUrls: string[];
  resolvedAt: Date | null;
  createdAt: Date;
}

export interface InsuranceCoverage {
  id: string;
  orderItemId: string;
  provider: string;
  policyNumber: string;
  coverageAmount: number;
  expiresAt: Date;
  status: InsuranceStatus;
}

// =============================================================================
// Announcements
// =============================================================================

export interface Announcement {
  id: string;
  title: string;
  content: string;
  category: AnnouncementCategory;
  priority: AnnouncementPriority;
  target: AnnouncementTarget;
  targetMitraIds: string[] | null;
  attachmentUrl: string | null;
  publishedAt: Date;
  createdBy: string;
  createdAt: Date;
  isRead?: boolean; // populated per-mitra
}

// =============================================================================
// Customer Service
// =============================================================================

export interface CSTicket {
  id: string;
  ticketNumber: string;
  customerId: string;
  assignedAgentId: string | null;
  subject: string;
  status: CSTicketStatus;
  priority: CSTicketPriority;
  createdAt: Date;
  updatedAt: Date;
  resolvedAt: Date | null;
  messages?: CSMessage[];
  customer?: CustomerProfile;
}

export interface CSMessage {
  id: string;
  ticketId: string;
  senderId: string;
  senderRole: "CUSTOMER" | "AGENT";
  content: string;
  attachmentUrl: string | null;
  createdAt: Date;
}

// =============================================================================
// Community (Mitra only)
// =============================================================================

export interface CommunityPost {
  id: string;
  mitraId: string;
  content: string;
  tags: string[];
  likesCount: number;
  repliesCount: number;
  status: CommunityPostStatus;
  createdAt: Date;
  mitra?: MitraProfile;
  replies?: CommunityReply[];
  likedByMe?: boolean;
}

export interface CommunityReply {
  id: string;
  postId: string;
  mitraId: string;
  content: string;
  createdAt: Date;
  mitra?: MitraProfile;
}

// =============================================================================
// Wishlist & Reviews
// =============================================================================

export interface WishlistItem {
  id: string;
  customerId: string;
  productId: string;
  createdAt: Date;
  product?: Product;
}

export interface ProductReview {
  id: string;
  orderItemId: string;
  customerId: string;
  productId: string;
  rating: number;
  comment: string | null;
  images: string[];
  verifiedPurchase: boolean;
  createdAt: Date;
  customer?: Pick<CustomerProfile, "fullName" | "avatarUrl">;
}

// =============================================================================
// Analytics
// =============================================================================

export interface DailyMetric {
  id: string;
  date: Date;
  gmv: number;
  transactionCount: number;
  newCustomers: number;
  activeCustomers: number;
  openTickets: number;
  avgResponseTimeMinutes: number;
}

// =============================================================================
// API Response Helpers
// =============================================================================

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  meta?: {
    page?: number;
    perPage?: number;
    total?: number;
  };
}

export interface PaginatedRequest {
  page?: number;
  perPage?: number;
  search?: string;
}
