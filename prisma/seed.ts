import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import {
  AnnouncementCategory,
  AnnouncementPriority,
  AnnouncementTarget,
  CSMessageSenderRole,
  CSTicketPriority,
  CSTicketStatus,
  CommunityPostStatus,
  InsuranceStatus,
  MembershipTier,
  MitraStatus,
  OrderStatus,
  PointReferenceType,
  PointTransactionType,
  PrismaClient,
  ProductStatus,
  UserRole,
  VoucherType,
  WarrantyClaimStatus,
  WarrantyType,
} from "../generated/prisma/client";
import bcrypt from "bcryptjs";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding database...");

  // ── 1. Users ──────────────────────────────────────────────────────────────
  const passwordHash = await bcrypt.hash("password123", 10);

  const centerAdminUser = await prisma.user.upsert({
    where: { email: "admin@dexhome.id" },
    update: {},
    create: {
      email: "admin@dexhome.id",
      phone: "08100000001",
      passwordHash,
      role: UserRole.CENTER_ADMIN,
    },
  });

  const agentUser = await prisma.user.upsert({
    where: { email: "agent@dexhome.id" },
    update: {},
    create: {
      email: "agent@dexhome.id",
      phone: "08100000002",
      passwordHash,
      role: UserRole.CENTER_ADMIN,
    },
  });

  // Mitra admin users
  const mitraAdminUser1 = await prisma.user.upsert({
    where: { email: "admin@furniturejaya.id" },
    update: {},
    create: {
      email: "admin@furniturejaya.id",
      phone: "08111000001",
      passwordHash,
      role: UserRole.MITRA_ADMIN,
    },
  });

  const mitraAdminUser2 = await prisma.user.upsert({
    where: { email: "admin@homestyle.id" },
    update: {},
    create: {
      email: "admin@homestyle.id",
      phone: "08111000002",
      passwordHash,
      role: UserRole.MITRA_ADMIN,
    },
  });

  const mitraAdminUser3 = await prisma.user.upsert({
    where: { email: "admin@rumahindah.id" },
    update: {},
    create: {
      email: "admin@rumahindah.id",
      phone: "08111000003",
      passwordHash,
      role: UserRole.MITRA_ADMIN,
    },
  });

  // Mitra staff users
  const mitraStaffUser1 = await prisma.user.upsert({
    where: { email: "staff1@furniturejaya.id" },
    update: {},
    create: {
      email: "staff1@furniturejaya.id",
      phone: "08122000001",
      passwordHash,
      role: UserRole.MITRA_USER,
    },
  });

  const mitraStaffUser2 = await prisma.user.upsert({
    where: { email: "staff2@homestyle.id" },
    update: {},
    create: {
      email: "staff2@homestyle.id",
      phone: "08122000002",
      passwordHash,
      role: UserRole.MITRA_USER,
    },
  });

  // Customer users
  const customerUser1 = await prisma.user.upsert({
    where: { email: "budi.santoso@gmail.com" },
    update: {},
    create: {
      email: "budi.santoso@gmail.com",
      phone: "08133000001",
      passwordHash,
      role: UserRole.CUSTOMER,
    },
  });

  const customerUser2 = await prisma.user.upsert({
    where: { email: "siti.rahayu@gmail.com" },
    update: {},
    create: {
      email: "siti.rahayu@gmail.com",
      phone: "08133000002",
      passwordHash,
      role: UserRole.CUSTOMER,
    },
  });

  const customerUser3 = await prisma.user.upsert({
    where: { email: "ahmad.fauzi@gmail.com" },
    update: {},
    create: {
      email: "ahmad.fauzi@gmail.com",
      phone: "08133000003",
      passwordHash,
      role: UserRole.CUSTOMER,
    },
  });

  const customerUser4 = await prisma.user.upsert({
    where: { email: "dewi.lestari@gmail.com" },
    update: {},
    create: {
      email: "dewi.lestari@gmail.com",
      phone: "08133000004",
      passwordHash,
      role: UserRole.CUSTOMER,
    },
  });

  console.log("✓ Users created");

  // ── 2. Mitra Profiles ─────────────────────────────────────────────────────
  const mitra1 = await prisma.mitraProfile.upsert({
    where: { mitraCode: "MTR-0001" },
    update: {},
    create: {
      userId: mitraAdminUser1.id,
      mitraCode: "MTR-0001",
      showroomName: "Furniture Jaya",
      address: "Jl. Sudirman No. 45",
      city: "Jakarta",
      latitude: -6.2088,
      longitude: 106.8456,
      status: MitraStatus.ACTIVE,
      verifiedAt: new Date("2024-01-15"),
      logoUrl: "https://placehold.co/200x200?text=FJ",
    },
  });

  const mitra2 = await prisma.mitraProfile.upsert({
    where: { mitraCode: "MTR-0002" },
    update: {},
    create: {
      userId: mitraAdminUser2.id,
      mitraCode: "MTR-0002",
      showroomName: "Home Style Surabaya",
      address: "Jl. Pemuda No. 120",
      city: "Surabaya",
      latitude: -7.2575,
      longitude: 112.7521,
      status: MitraStatus.ACTIVE,
      verifiedAt: new Date("2024-02-10"),
      logoUrl: "https://placehold.co/200x200?text=HS",
    },
  });

  const mitra3 = await prisma.mitraProfile.upsert({
    where: { mitraCode: "MTR-0003" },
    update: {},
    create: {
      userId: mitraAdminUser3.id,
      mitraCode: "MTR-0003",
      showroomName: "Rumah Indah Bandung",
      address: "Jl. Dago No. 88",
      city: "Bandung",
      latitude: -6.9175,
      longitude: 107.6191,
      status: MitraStatus.ACTIVE,
      verifiedAt: new Date("2024-03-05"),
      logoUrl: "https://placehold.co/200x200?text=RI",
    },
  });

  // Staff mitra profiles (link to their admin's showroom via separate user accounts)
  await prisma.mitraProfile.upsert({
    where: { mitraCode: "MTR-0001-S1" },
    update: {},
    create: {
      userId: mitraStaffUser1.id,
      mitraCode: "MTR-0001-S1",
      showroomName: "Furniture Jaya",
      address: "Jl. Sudirman No. 45",
      city: "Jakarta",
      latitude: -6.2088,
      longitude: 106.8456,
      status: MitraStatus.ACTIVE,
      verifiedAt: new Date("2024-01-15"),
    },
  });

  await prisma.mitraProfile.upsert({
    where: { mitraCode: "MTR-0002-S1" },
    update: {},
    create: {
      userId: mitraStaffUser2.id,
      mitraCode: "MTR-0002-S1",
      showroomName: "Home Style Surabaya",
      address: "Jl. Pemuda No. 120",
      city: "Surabaya",
      latitude: -7.2575,
      longitude: 112.7521,
      status: MitraStatus.ACTIVE,
      verifiedAt: new Date("2024-02-10"),
    },
  });

  console.log("✓ Mitra profiles created");

  // ── 3. Customer Profiles ──────────────────────────────────────────────────
  const customer1 = await prisma.customerProfile.upsert({
    where: { userId: customerUser1.id },
    update: {},
    create: {
      userId: customerUser1.id,
      fullName: "Budi Santoso",
      membershipTier: MembershipTier.GOLD,
      totalPoints: 3500,
      tierExpiresAt: new Date("2025-12-31"),
      avatarUrl: "https://placehold.co/100x100?text=BS",
    },
  });

  const customer2 = await prisma.customerProfile.upsert({
    where: { userId: customerUser2.id },
    update: {},
    create: {
      userId: customerUser2.id,
      fullName: "Siti Rahayu",
      membershipTier: MembershipTier.PLATINUM,
      totalPoints: 12800,
      tierExpiresAt: new Date("2025-12-31"),
      avatarUrl: "https://placehold.co/100x100?text=SR",
    },
  });

  const customer3 = await prisma.customerProfile.upsert({
    where: { userId: customerUser3.id },
    update: {},
    create: {
      userId: customerUser3.id,
      fullName: "Ahmad Fauzi",
      membershipTier: MembershipTier.SILVER,
      totalPoints: 850,
      tierExpiresAt: new Date("2025-12-31"),
    },
  });

  const customer4 = await prisma.customerProfile.upsert({
    where: { userId: customerUser4.id },
    update: {},
    create: {
      userId: customerUser4.id,
      fullName: "Dewi Lestari",
      membershipTier: MembershipTier.SILVER,
      totalPoints: 200,
      tierExpiresAt: new Date("2025-06-30"),
    },
  });

  console.log("✓ Customer profiles created");

  // ── 4. Categories ─────────────────────────────────────────────────────────
  const catLivingRoom = await prisma.category.upsert({
    where: { slug: "ruang-tamu" },
    update: {},
    create: { name: "Ruang Tamu", slug: "ruang-tamu", icon: "🛋️" },
  });

  const catBedroom = await prisma.category.upsert({
    where: { slug: "kamar-tidur" },
    update: {},
    create: { name: "Kamar Tidur", slug: "kamar-tidur", icon: "🛏️" },
  });

  const catDining = await prisma.category.upsert({
    where: { slug: "ruang-makan" },
    update: {},
    create: { name: "Ruang Makan", slug: "ruang-makan", icon: "🍽️" },
  });

  const catOffice = await prisma.category.upsert({
    where: { slug: "ruang-kerja" },
    update: {},
    create: { name: "Ruang Kerja", slug: "ruang-kerja", icon: "💼" },
  });

  const catOutdoor = await prisma.category.upsert({
    where: { slug: "outdoor" },
    update: {},
    create: { name: "Outdoor", slug: "outdoor", icon: "🌿" },
  });

  // Subcategories
  const catSofa = await prisma.category.upsert({
    where: { slug: "sofa" },
    update: {},
    create: {
      name: "Sofa",
      slug: "sofa",
      icon: "🛋️",
      parentId: catLivingRoom.id,
    },
  });

  const catCoffeeTable = await prisma.category.upsert({
    where: { slug: "meja-kopi" },
    update: {},
    create: {
      name: "Meja Kopi",
      slug: "meja-kopi",
      icon: "☕",
      parentId: catLivingRoom.id,
    },
  });

  const catBed = await prisma.category.upsert({
    where: { slug: "ranjang" },
    update: {},
    create: {
      name: "Ranjang",
      slug: "ranjang",
      icon: "🛏️",
      parentId: catBedroom.id,
    },
  });

  console.log("✓ Categories created");

  // ── 5. Products ───────────────────────────────────────────────────────────
  const product1 = await prisma.product.upsert({
    where: { sku: "PRD-SOFA-001" },
    update: {},
    create: {
      sku: "PRD-SOFA-001",
      name: "Sofa Valencia 3 Dudukan",
      description:
        "Sofa premium dengan rangka kayu jati solid dan busa high-density. Cocok untuk ruang tamu modern maupun klasik.",
      categoryId: catSofa.id,
      mitraId: mitra1.id,
      price: 8500000,
      originalPrice: 10000000,
      memberDiscountPct: 5,
      pointsPerTxn: 850,
      warrantyMonths: 24,
      warrantyType: WarrantyType.MANUFACTURER,
      insuranceAvailable: true,
      weightKg: 65,
      dimensionsCm: "210×85×85",
      status: ProductStatus.ACTIVE,
    },
  });

  const product2 = await prisma.product.upsert({
    where: { sku: "PRD-BED-001" },
    update: {},
    create: {
      sku: "PRD-BED-001",
      name: "Ranjang Minimalis Orion",
      description:
        "Ranjang minimalis dengan headboard berlapis fabric premium. Desain modern Skandinavia.",
      categoryId: catBed.id,
      mitraId: mitra2.id,
      price: 5200000,
      originalPrice: 6000000,
      memberDiscountPct: 8,
      pointsPerTxn: 520,
      warrantyMonths: 12,
      warrantyType: WarrantyType.STORE,
      insuranceAvailable: false,
      weightKg: 45,
      dimensionsCm: "160×200×120",
      status: ProductStatus.ACTIVE,
    },
  });

  const product3 = await prisma.product.upsert({
    where: { sku: "PRD-TBL-001" },
    update: {},
    create: {
      sku: "PRD-TBL-001",
      name: "Meja Makan Kayu Jati 6 Kursi",
      description:
        "Set meja makan dari kayu jati pilihan. Tahan lama dan anti rayap. Kapasitas 6 orang.",
      categoryId: catDining.id,
      mitraId: mitra1.id,
      price: 12000000,
      memberDiscountPct: 10,
      pointsPerTxn: 1200,
      warrantyMonths: 36,
      warrantyType: WarrantyType.DEXHOME,
      insuranceAvailable: true,
      weightKg: 90,
      dimensionsCm: "180×90×75",
      status: ProductStatus.ACTIVE,
    },
  });

  const product4 = await prisma.product.upsert({
    where: { sku: "PRD-DESK-001" },
    update: {},
    create: {
      sku: "PRD-DESK-001",
      name: "Meja Kerja Ergonomis Sitio",
      description:
        "Meja kerja adjustable height dengan cable management terpadu. Ideal untuk home office.",
      categoryId: catOffice.id,
      mitraId: mitra3.id,
      price: 3800000,
      originalPrice: 4500000,
      memberDiscountPct: 5,
      pointsPerTxn: 380,
      warrantyMonths: 12,
      warrantyType: WarrantyType.STORE,
      insuranceAvailable: false,
      weightKg: 30,
      dimensionsCm: "140×70×75",
      status: ProductStatus.ACTIVE,
    },
  });

  const product5 = await prisma.product.upsert({
    where: { sku: "PRD-CTB-001" },
    update: {},
    create: {
      sku: "PRD-CTB-001",
      name: "Meja Kopi Nordic Round",
      description:
        "Meja kopi bulat dengan kaki kayu solid dan top kaca tempered 12mm.",
      categoryId: catCoffeeTable.id,
      mitraId: mitra2.id,
      price: 1800000,
      memberDiscountPct: 3,
      pointsPerTxn: 180,
      warrantyMonths: 6,
      warrantyType: WarrantyType.STORE,
      insuranceAvailable: false,
      weightKg: 18,
      dimensionsCm: "80×80×45",
      status: ProductStatus.ACTIVE,
    },
  });

  const product6 = await prisma.product.upsert({
    where: { sku: "PRD-OUT-001" },
    update: {},
    create: {
      sku: "PRD-OUT-001",
      name: "Set Kursi Taman Rotan",
      description:
        "Set kursi taman 4 buah + meja dari rotan sintetis. Tahan cuaca dan UV.",
      categoryId: catOutdoor.id,
      mitraId: mitra3.id,
      price: 4200000,
      memberDiscountPct: 5,
      pointsPerTxn: 420,
      warrantyMonths: 12,
      warrantyType: WarrantyType.STORE,
      insuranceAvailable: false,
      weightKg: 25,
      dimensionsCm: "120×80×70",
      status: ProductStatus.ACTIVE,
    },
  });

  console.log("✓ Products created");

  // ── 6. Product Images ─────────────────────────────────────────────────────
  await prisma.productImage.createMany({
    skipDuplicates: true,
    data: [
      {
        productId: product1.id,
        url: "https://placehold.co/800x600?text=Sofa+Valencia+1",
        order: 0,
      },
      {
        productId: product1.id,
        url: "https://placehold.co/800x600?text=Sofa+Valencia+2",
        order: 1,
      },
      {
        productId: product2.id,
        url: "https://placehold.co/800x600?text=Ranjang+Orion+1",
        order: 0,
      },
      {
        productId: product2.id,
        url: "https://placehold.co/800x600?text=Ranjang+Orion+2",
        order: 1,
      },
      {
        productId: product3.id,
        url: "https://placehold.co/800x600?text=Meja+Makan",
        order: 0,
      },
      {
        productId: product4.id,
        url: "https://placehold.co/800x600?text=Meja+Kerja",
        order: 0,
      },
      {
        productId: product5.id,
        url: "https://placehold.co/800x600?text=Meja+Kopi",
        order: 0,
      },
      {
        productId: product6.id,
        url: "https://placehold.co/800x600?text=Kursi+Taman",
        order: 0,
      },
    ],
  });

  console.log("✓ Product images created");

  // ── 7. Product Variants ───────────────────────────────────────────────────
  const variantSofa1 = await prisma.productVariant.upsert({
    where: { id: "00000000-0000-0000-0000-000000000101" },
    update: {},
    create: {
      id: "00000000-0000-0000-0000-000000000101",
      productId: product1.id,
      size: "3 Dudukan",
      color: "Abu-abu",
      colorHex: "#808080",
      priceDelta: 0,
      skuSuffix: "3D-ABU",
    },
  });

  const variantSofa2 = await prisma.productVariant.upsert({
    where: { id: "00000000-0000-0000-0000-000000000102" },
    update: {},
    create: {
      id: "00000000-0000-0000-0000-000000000102",
      productId: product1.id,
      size: "3 Dudukan",
      color: "Cokelat",
      colorHex: "#8B4513",
      priceDelta: 200000,
      skuSuffix: "3D-COK",
    },
  });

  const variantBed1 = await prisma.productVariant.upsert({
    where: { id: "00000000-0000-0000-0000-000000000103" },
    update: {},
    create: {
      id: "00000000-0000-0000-0000-000000000103",
      productId: product2.id,
      size: "160×200",
      color: "Putih",
      colorHex: "#FFFFFF",
      priceDelta: 0,
      skuSuffix: "160-PUT",
    },
  });

  const variantBed2 = await prisma.productVariant.upsert({
    where: { id: "00000000-0000-0000-0000-000000000104" },
    update: {},
    create: {
      id: "00000000-0000-0000-0000-000000000104",
      productId: product2.id,
      size: "180×200",
      color: "Putih",
      colorHex: "#FFFFFF",
      priceDelta: 500000,
      skuSuffix: "180-PUT",
    },
  });

  const variantDesk1 = await prisma.productVariant.upsert({
    where: { id: "00000000-0000-0000-0000-000000000105" },
    update: {},
    create: {
      id: "00000000-0000-0000-0000-000000000105",
      productId: product4.id,
      color: "Hitam",
      colorHex: "#000000",
      priceDelta: 0,
      skuSuffix: "HIT",
    },
  });

  const variantDesk2 = await prisma.productVariant.upsert({
    where: { id: "00000000-0000-0000-0000-000000000106" },
    update: {},
    create: {
      id: "00000000-0000-0000-0000-000000000106",
      productId: product4.id,
      color: "Putih",
      colorHex: "#FFFFFF",
      priceDelta: 0,
      skuSuffix: "PUT",
    },
  });

  console.log("✓ Product variants created");

  // ── 8. Stock Per Showroom ─────────────────────────────────────────────────
  await prisma.stockPerShowroom.createMany({
    skipDuplicates: true,
    data: [
      // Mitra 1 (Jakarta) stocks
      {
        productId: product1.id,
        variantId: variantSofa1.id,
        mitraId: mitra1.id,
        quantity: 12,
        minQuantity: 3,
      },
      {
        productId: product1.id,
        variantId: variantSofa2.id,
        mitraId: mitra1.id,
        quantity: 8,
        minQuantity: 3,
      },
      {
        productId: product3.id,
        mitraId: mitra1.id,
        quantity: 5,
        minQuantity: 2,
      },
      {
        productId: product5.id,
        mitraId: mitra1.id,
        quantity: 20,
        minQuantity: 5,
      },
      // Mitra 2 (Surabaya) stocks
      {
        productId: product2.id,
        variantId: variantBed1.id,
        mitraId: mitra2.id,
        quantity: 10,
        minQuantity: 3,
      },
      {
        productId: product2.id,
        variantId: variantBed2.id,
        mitraId: mitra2.id,
        quantity: 6,
        minQuantity: 2,
      },
      {
        productId: product5.id,
        mitraId: mitra2.id,
        quantity: 15,
        minQuantity: 5,
      },
      // Mitra 3 (Bandung) stocks
      {
        productId: product4.id,
        variantId: variantDesk1.id,
        mitraId: mitra3.id,
        quantity: 9,
        minQuantity: 3,
      },
      {
        productId: product4.id,
        variantId: variantDesk2.id,
        mitraId: mitra3.id,
        quantity: 7,
        minQuantity: 3,
      },
      {
        productId: product6.id,
        mitraId: mitra3.id,
        quantity: 4,
        minQuantity: 2,
      },
    ],
  });

  console.log("✓ Stock per showroom created");

  // ── 9. Vouchers ───────────────────────────────────────────────────────────
  const voucher1 = await prisma.voucher.upsert({
    where: { code: "WELCOME50K" },
    update: {},
    create: {
      code: "WELCOME50K",
      name: "Welcome Discount 50K",
      type: VoucherType.FIXED_DISCOUNT,
      value: 50000,
      minPurchase: 500000,
      maxUses: 1000,
      usesPerUser: 1,
      pointsCost: 0,
      validFrom: new Date("2024-01-01"),
      validUntil: new Date("2025-12-31"),
    },
  });

  const voucher2 = await prisma.voucher.upsert({
    where: { code: "DISKON10PCT" },
    update: {},
    create: {
      code: "DISKON10PCT",
      name: "Diskon 10% Member",
      type: VoucherType.PERCENT_DISCOUNT,
      value: 10,
      minPurchase: 2000000,
      maxUses: 500,
      usesPerUser: 1,
      pointsCost: 1000,
      validFrom: new Date("2024-01-01"),
      validUntil: new Date("2025-12-31"),
    },
  });

  const voucher3 = await prisma.voucher.upsert({
    where: { code: "CASHBACK200K" },
    update: {},
    create: {
      code: "CASHBACK200K",
      name: "Cashback 200K Platinum",
      type: VoucherType.CASHBACK,
      value: 200000,
      minPurchase: 5000000,
      usesPerUser: 1,
      pointsCost: 2000,
      validFrom: new Date("2024-01-01"),
      validUntil: new Date("2025-06-30"),
    },
  });

  console.log("✓ Vouchers created");

  // ── 10. Orders ────────────────────────────────────────────────────────────
  const order1 = await prisma.order.upsert({
    where: { orderNumber: "DXH-2401-0001" },
    update: {},
    create: {
      orderNumber: "DXH-2401-0001",
      customerId: customer1.id,
      mitraId: mitra1.id,
      status: OrderStatus.COMPLETED,
      totalAmount: 8075000,
      discountAmount: 425000,
      voucherId: voucher1.id,
      pointsEarned: 808,
      pointsUsed: 0,
      paymentMethod: "Transfer Bank",
      shippingAddress: {
        street: "Jl. Kebon Jeruk No. 12",
        city: "Jakarta",
        province: "DKI Jakarta",
        postalCode: "11530",
      },
      notes: "Harap dirakit di tempat",
      createdAt: new Date("2024-02-10"),
    },
  });

  const order2 = await prisma.order.upsert({
    where: { orderNumber: "DXH-2402-0015" },
    update: {},
    create: {
      orderNumber: "DXH-2402-0015",
      customerId: customer2.id,
      mitraId: mitra2.id,
      status: OrderStatus.COMPLETED,
      totalAmount: 4680000,
      discountAmount: 520000,
      pointsEarned: 468,
      pointsUsed: 0,
      paymentMethod: "Kredivo",
      installmentProvider: "Kredivo",
      shippingAddress: {
        street: "Jl. Raya Darmo No. 55",
        city: "Surabaya",
        province: "Jawa Timur",
        postalCode: "60241",
      },
      notes: "",
      createdAt: new Date("2024-02-20"),
    },
  });

  const order3 = await prisma.order.upsert({
    where: { orderNumber: "DXH-2403-0032" },
    update: {},
    create: {
      orderNumber: "DXH-2403-0032",
      customerId: customer1.id,
      mitraId: mitra3.id,
      status: OrderStatus.DELIVERED,
      totalAmount: 3800000,
      discountAmount: 0,
      pointsEarned: 380,
      pointsUsed: 0,
      paymentMethod: "Kartu Kredit",
      shippingAddress: {
        street: "Jl. Kebon Jeruk No. 12",
        city: "Jakarta",
        province: "DKI Jakarta",
        postalCode: "11530",
      },
      notes: "",
      createdAt: new Date("2024-03-15"),
    },
  });

  const order4 = await prisma.order.upsert({
    where: { orderNumber: "DXH-2404-0048" },
    update: {},
    create: {
      orderNumber: "DXH-2404-0048",
      customerId: customer3.id,
      mitraId: mitra1.id,
      status: OrderStatus.PROCESSING,
      totalAmount: 12000000,
      discountAmount: 0,
      pointsEarned: 1200,
      pointsUsed: 0,
      paymentMethod: "Akulaku",
      installmentProvider: "Akulaku",
      shippingAddress: {
        street: "Jl. Mangga Dua No. 7",
        city: "Jakarta",
        province: "DKI Jakarta",
        postalCode: "10730",
      },
      notes: "Hubungi sebelum pengiriman",
      createdAt: new Date("2024-04-01"),
    },
  });

  const order5 = await prisma.order.upsert({
    where: { orderNumber: "DXH-2404-0052" },
    update: {},
    create: {
      orderNumber: "DXH-2404-0052",
      customerId: customer2.id,
      mitraId: mitra1.id,
      status: OrderStatus.PENDING,
      totalAmount: 8500000,
      discountAmount: 0,
      pointsEarned: 0,
      pointsUsed: 0,
      paymentMethod: "Transfer Bank",
      shippingAddress: {
        street: "Jl. Raya Darmo No. 55",
        city: "Surabaya",
        province: "Jawa Timur",
        postalCode: "60241",
      },
      notes: "",
      createdAt: new Date("2024-04-03"),
    },
  });

  console.log("✓ Orders created");

  // ── 11. Order Items ───────────────────────────────────────────────────────
  const orderItem1 = await prisma.orderItem.create({
    data: {
      orderId: order1.id,
      productId: product1.id,
      variantId: variantSofa1.id,
      quantity: 1,
      unitPrice: 8500000,
      subtotal: 8500000,
    },
  });

  const orderItem2 = await prisma.orderItem.create({
    data: {
      orderId: order2.id,
      productId: product2.id,
      variantId: variantBed1.id,
      quantity: 1,
      unitPrice: 5200000,
      subtotal: 5200000,
    },
  });

  const orderItem3 = await prisma.orderItem.create({
    data: {
      orderId: order3.id,
      productId: product4.id,
      variantId: variantDesk1.id,
      quantity: 1,
      unitPrice: 3800000,
      subtotal: 3800000,
    },
  });

  const orderItem4 = await prisma.orderItem.create({
    data: {
      orderId: order4.id,
      productId: product3.id,
      quantity: 1,
      unitPrice: 12000000,
      subtotal: 12000000,
    },
  });

  await prisma.orderItem.create({
    data: {
      orderId: order5.id,
      productId: product1.id,
      variantId: variantSofa2.id,
      quantity: 1,
      unitPrice: 8700000,
      subtotal: 8700000,
    },
  });

  console.log("✓ Order items created");

  // ── 12. Insurance Coverage ────────────────────────────────────────────────
  await prisma.insuranceCoverage.upsert({
    where: { orderItemId: orderItem1.id },
    update: {},
    create: {
      orderItemId: orderItem1.id,
      provider: "Asuransi Sinar Mas",
      policyNumber: "SM-2024-00112",
      coverageAmount: 8500000,
      expiresAt: new Date("2026-02-10"),
      status: InsuranceStatus.ACTIVE,
    },
  });

  console.log("✓ Insurance coverage created");

  // ── 13. Warranty Claims ───────────────────────────────────────────────────
  await prisma.warrantyClaim.create({
    data: {
      orderItemId: orderItem2.id,
      customerId: customer2.id,
      status: WarrantyClaimStatus.REVIEWING,
      description:
        "Jahitan headboard mulai terbuka setelah 2 bulan pemakaian normal.",
      evidenceUrls: [
        "https://placehold.co/400x300?text=Evidence+1",
        "https://placehold.co/400x300?text=Evidence+2",
      ],
    },
  });

  console.log("✓ Warranty claims created");

  // ── 14. Point Transactions ────────────────────────────────────────────────
  await prisma.pointTransaction.createMany({
    data: [
      {
        customerId: customer1.id,
        type: PointTransactionType.EARN,
        amount: 808,
        referenceType: PointReferenceType.ORDER,
        referenceId: order1.id,
        description: "Poin dari pembelian DXH-2401-0001",
        inputByMitraId: mitra1.id,
        createdAt: new Date("2024-02-10"),
      },
      {
        customerId: customer1.id,
        type: PointTransactionType.EARN,
        amount: 380,
        referenceType: PointReferenceType.ORDER,
        referenceId: order3.id,
        description: "Poin dari pembelian DXH-2403-0032",
        inputByMitraId: mitra3.id,
        createdAt: new Date("2024-03-15"),
      },
      {
        customerId: customer1.id,
        type: PointTransactionType.BONUS,
        amount: 500,
        referenceType: PointReferenceType.MANUAL,
        description: "Bonus poin ulang tahun pelanggan",
        createdAt: new Date("2024-04-01"),
      },
      {
        customerId: customer2.id,
        type: PointTransactionType.EARN,
        amount: 468,
        referenceType: PointReferenceType.ORDER,
        referenceId: order2.id,
        description: "Poin dari pembelian DXH-2402-0015",
        inputByMitraId: mitra2.id,
        createdAt: new Date("2024-02-20"),
      },
      {
        customerId: customer2.id,
        type: PointTransactionType.BONUS,
        amount: 5000,
        referenceType: PointReferenceType.MANUAL,
        description: "Bonus poin tier upgrade ke Platinum",
        createdAt: new Date("2024-03-01"),
      },
      {
        customerId: customer3.id,
        type: PointTransactionType.EARN,
        amount: 850,
        referenceType: PointReferenceType.ORDER,
        referenceId: order4.id,
        description: "Poin dari pembelian DXH-2404-0048",
        inputByMitraId: mitra1.id,
        createdAt: new Date("2024-04-01"),
      },
    ],
  });

  console.log("✓ Point transactions created");

  // ── 15. Voucher Claims ────────────────────────────────────────────────────
  await prisma.voucherClaim.upsert({
    where: { voucherId_customerId: { voucherId: voucher1.id, customerId: customer1.id } },
    update: {},
    create: {
      voucherId: voucher1.id,
      customerId: customer1.id,
      usedAt: new Date("2024-02-10"),
      orderId: order1.id,
    },
  });

  await prisma.voucherClaim.upsert({
    where: { voucherId_customerId: { voucherId: voucher2.id, customerId: customer2.id } },
    update: {},
    create: {
      voucherId: voucher2.id,
      customerId: customer2.id,
      usedAt: null,
    },
  });

  await prisma.voucherClaim.upsert({
    where: { voucherId_customerId: { voucherId: voucher3.id, customerId: customer2.id } },
    update: {},
    create: {
      voucherId: voucher3.id,
      customerId: customer2.id,
      usedAt: null,
    },
  });

  await prisma.voucherClaim.upsert({
    where: { voucherId_customerId: { voucherId: voucher1.id, customerId: customer3.id } },
    update: {},
    create: {
      voucherId: voucher1.id,
      customerId: customer3.id,
      usedAt: null,
    },
  });

  console.log("✓ Voucher claims created");

  // ── 16. Product Reviews ───────────────────────────────────────────────────
  await prisma.productReview.upsert({
    where: { orderItemId: orderItem1.id },
    update: {},
    create: {
      orderItemId: orderItem1.id,
      customerId: customer1.id,
      productId: product1.id,
      rating: 5,
      comment:
        "Sofa sangat nyaman dan kualitasnya bagus! Pengiriman cepat, perakitan rapi. Sangat puas.",
      images: ["https://placehold.co/400x300?text=Review+Photo"],
      verifiedPurchase: true,
      createdAt: new Date("2024-02-25"),
    },
  });

  await prisma.productReview.upsert({
    where: { orderItemId: orderItem3.id },
    update: {},
    create: {
      orderItemId: orderItem3.id,
      customerId: customer1.id,
      productId: product4.id,
      rating: 4,
      comment:
        "Meja kokoh dan desain modern. Cable management sangat membantu. Hanya kurang instruksi perakitan.",
      images: [],
      verifiedPurchase: true,
      createdAt: new Date("2024-03-25"),
    },
  });

  console.log("✓ Product reviews created");

  // ── 17. Wishlist ──────────────────────────────────────────────────────────
  await prisma.wishlist.createMany({
    skipDuplicates: true,
    data: [
      { customerId: customer1.id, productId: product3.id },
      { customerId: customer1.id, productId: product5.id },
      { customerId: customer2.id, productId: product1.id },
      { customerId: customer2.id, productId: product6.id },
      { customerId: customer3.id, productId: product2.id },
      { customerId: customer4.id, productId: product4.id },
    ],
  });

  console.log("✓ Wishlist entries created");

  // ── 18. Announcements ─────────────────────────────────────────────────────
  const ann1 = await prisma.announcement.create({
    data: {
      title: "Promo Ramadan 2024 — Diskon s/d 30%",
      content:
        "Rayakan Ramadan dengan koleksi furnitur pilihan DexHome! Nikmati diskon hingga 30% untuk semua kategori ruang tamu dan kamar tidur. Berlaku 1–30 Maret 2024.",
      category: AnnouncementCategory.PROMO,
      priority: AnnouncementPriority.IMPORTANT,
      target: AnnouncementTarget.ALL_MITRA,
      publishedAt: new Date("2024-03-01"),
      createdBy: centerAdminUser.id,
    },
  });

  const ann2 = await prisma.announcement.create({
    data: {
      title: "Update Sistem Poin — Efektif 1 April 2024",
      content:
        "Mulai 1 April 2024, rasio poin berubah menjadi 1 poin per Rp 10.000 transaksi. Input poin wajib dilakukan maksimal 3 hari setelah transaksi.",
      category: AnnouncementCategory.POLICY,
      priority: AnnouncementPriority.URGENT,
      target: AnnouncementTarget.VERIFIED_MITRA,
      publishedAt: new Date("2024-03-20"),
      createdBy: centerAdminUser.id,
    },
  });

  await prisma.announcement.create({
    data: {
      title: "Jadwal Maintenance Sistem — 15 April 2024",
      content:
        "Sistem DexHome akan dalam maintenance pada 15 April 2024 pukul 00.00–06.00 WIB. Selama maintenance, fitur input poin dan katalog tidak dapat diakses.",
      category: AnnouncementCategory.SYSTEM,
      priority: AnnouncementPriority.NORMAL,
      target: AnnouncementTarget.ALL_MITRA,
      publishedAt: new Date("2024-04-10"),
      createdBy: centerAdminUser.id,
    },
  });

  console.log("✓ Announcements created");

  // ── 19. Announcement Reads ────────────────────────────────────────────────
  await prisma.announcementRead.createMany({
    skipDuplicates: true,
    data: [
      { announcementId: ann1.id, mitraId: mitra1.id, readAt: new Date("2024-03-01") },
      { announcementId: ann1.id, mitraId: mitra2.id, readAt: new Date("2024-03-02") },
      { announcementId: ann2.id, mitraId: mitra1.id, readAt: new Date("2024-03-21") },
    ],
  });

  console.log("✓ Announcement reads created");

  // ── 20. CS Tickets ────────────────────────────────────────────────────────
  const ticket1 = await prisma.cSTicket.upsert({
    where: { ticketNumber: "TKT-0001" },
    update: {},
    create: {
      ticketNumber: "TKT-0001",
      customerId: customer1.id,
      assignedAgentId: agentUser.id,
      subject: "Sofa belum dirakit setelah 3 hari pengiriman",
      status: CSTicketStatus.ANSWERED,
      priority: CSTicketPriority.HIGH,
      createdAt: new Date("2024-02-13"),
    },
  });

  const ticket2 = await prisma.cSTicket.upsert({
    where: { ticketNumber: "TKT-0002" },
    update: {},
    create: {
      ticketNumber: "TKT-0002",
      customerId: customer2.id,
      subject: "Klaim garansi ranjang — jahitan headboard terbuka",
      status: CSTicketStatus.OPEN,
      priority: CSTicketPriority.NORMAL,
      createdAt: new Date("2024-03-10"),
    },
  });

  const ticket3 = await prisma.cSTicket.upsert({
    where: { ticketNumber: "TKT-0003" },
    update: {},
    create: {
      ticketNumber: "TKT-0003",
      customerId: customer3.id,
      subject: "Status pesanan DXH-2404-0048 tidak update",
      status: CSTicketStatus.OPEN,
      priority: CSTicketPriority.NORMAL,
      createdAt: new Date("2024-04-02"),
    },
  });

  console.log("✓ CS tickets created");

  // ── 21. CS Messages ───────────────────────────────────────────────────────
  await prisma.cSMessage.createMany({
    data: [
      {
        ticketId: ticket1.id,
        senderId: customerUser1.id,
        senderRole: CSMessageSenderRole.CUSTOMER,
        content:
          "Halo, pesanan saya DXH-2401-0001 sudah tiba 3 hari lalu tapi belum ada teknisi yang datang untuk merakit. Mohon bantuannya.",
        createdAt: new Date("2024-02-13T09:00:00"),
      },
      {
        ticketId: ticket1.id,
        senderId: agentUser.id,
        senderRole: CSMessageSenderRole.AGENT,
        content:
          "Selamat pagi Bapak Budi. Mohon maaf atas keterlambatan ini. Kami sudah menghubungi tim Furniture Jaya dan teknisi akan datang besok pagi antara pukul 09.00–12.00 WIB. Ada yang bisa kami bantu lagi?",
        createdAt: new Date("2024-02-13T10:30:00"),
      },
      {
        ticketId: ticket1.id,
        senderId: customerUser1.id,
        senderRole: CSMessageSenderRole.CUSTOMER,
        content:
          "Baik, terima kasih. Semoga besok tepat waktu ya.",
        createdAt: new Date("2024-02-13T10:45:00"),
      },
      {
        ticketId: ticket2.id,
        senderId: customerUser2.id,
        senderRole: CSMessageSenderRole.CUSTOMER,
        content:
          "Saya ingin mengajukan klaim garansi untuk ranjang yang saya beli bulan lalu. Jahitan headboard sudah mulai terbuka padahal pemakaian normal.",
        attachmentUrl: "https://placehold.co/400x300?text=Bukti+Kerusakan",
        createdAt: new Date("2024-03-10T14:00:00"),
      },
      {
        ticketId: ticket3.id,
        senderId: customerUser3.id,
        senderRole: CSMessageSenderRole.CUSTOMER,
        content:
          "Status pesanan saya DXH-2404-0048 masih PROCESSING dari kemarin. Kapan bisa dikirim?",
        createdAt: new Date("2024-04-02T11:00:00"),
      },
    ],
  });

  console.log("✓ CS messages created");

  // ── 22. Community Posts ───────────────────────────────────────────────────
  const post1 = await prisma.communityPost.create({
    data: {
      mitraId: mitra1.id,
      content:
        "Tips dari kami di Furniture Jaya: untuk menjaga sofa kulit tetap awet, lap dengan kain lembab seminggu sekali dan hindari paparan sinar matahari langsung. Sofa bisa bertahan 10+ tahun! 🛋️",
      tags: ["tips", "perawatan", "sofa"],
      likesCount: 0,
      repliesCount: 0,
      status: CommunityPostStatus.ACTIVE,
      createdAt: new Date("2024-03-05"),
    },
  });

  const post2 = await prisma.communityPost.create({
    data: {
      mitraId: mitra2.id,
      content:
        "Showroom kami di Surabaya baru saja kedatangan koleksi ranjang terbaru dengan desain Japandi yang sedang tren! Yuk kunjungi kami di Jl. Pemuda No. 120 📍",
      tags: ["koleksi-baru", "japandi", "kamar-tidur"],
      likesCount: 0,
      repliesCount: 0,
      status: CommunityPostStatus.ACTIVE,
      createdAt: new Date("2024-03-12"),
    },
  });

  const post3 = await prisma.communityPost.create({
    data: {
      mitraId: mitra3.id,
      content:
        "Pertanyaan untuk sesama mitra: bagaimana cara terbaik menjelaskan perbedaan kualitas kayu solid vs MDF ke pelanggan? Kami sering kesulitan di sini.",
      tags: ["diskusi", "edukasi", "kayu"],
      likesCount: 0,
      repliesCount: 0,
      status: CommunityPostStatus.ACTIVE,
      createdAt: new Date("2024-03-18"),
    },
  });

  console.log("✓ Community posts created");

  // ── 23. Community Replies ─────────────────────────────────────────────────
  const reply1 = await prisma.communityReply.create({
    data: {
      postId: post3.id,
      mitraId: mitra1.id,
      content:
        "Kami biasanya membawa sample kecil kedua material dan meminta pelanggan merasakannya langsung — berat dan tekstur kayu solid langsung ketahuan. Juga tunjukkan potongan penampang kayu.",
      createdAt: new Date("2024-03-18T15:00:00"),
    },
  });

  const reply2 = await prisma.communityReply.create({
    data: {
      postId: post3.id,
      mitraId: mitra2.id,
      content:
        "Setuju dengan Furniture Jaya! Kami juga menjelaskan dari sisi harga jangka panjang — kayu solid mungkin lebih mahal tapi bertahan jauh lebih lama. Pelanggan paham kalau dibilang 'investasi'.",
      createdAt: new Date("2024-03-19T09:00:00"),
    },
  });

  // Update reply counts
  await prisma.communityPost.update({
    where: { id: post3.id },
    data: { repliesCount: 2 },
  });

  console.log("✓ Community replies created");

  // ── 24. Community Likes ───────────────────────────────────────────────────
  await prisma.communityLike.createMany({
    skipDuplicates: true,
    data: [
      { postId: post1.id, mitraId: mitra2.id },
      { postId: post1.id, mitraId: mitra3.id },
      { postId: post2.id, mitraId: mitra1.id },
      { postId: post3.id, mitraId: mitra1.id },
      { postId: post3.id, mitraId: mitra2.id },
    ],
  });

  // Update like counts
  await prisma.communityPost.update({ where: { id: post1.id }, data: { likesCount: 2 } });
  await prisma.communityPost.update({ where: { id: post2.id }, data: { likesCount: 1 } });
  await prisma.communityPost.update({ where: { id: post3.id }, data: { likesCount: 2 } });

  console.log("✓ Community likes created");

  // ── 25. Daily Metrics ─────────────────────────────────────────────────────
  await prisma.dailyMetric.createMany({
    skipDuplicates: true,
    data: [
      {
        date: new Date("2024-03-28"),
        gmv: 45000000n,
        transactionCount: 5,
        newCustomers: 3,
        activeCustomers: 28,
        openTickets: 4,
        avgResponseTimeMinutes: 32.5,
      },
      {
        date: new Date("2024-03-29"),
        gmv: 62000000n,
        transactionCount: 7,
        newCustomers: 5,
        activeCustomers: 35,
        openTickets: 3,
        avgResponseTimeMinutes: 28.0,
      },
      {
        date: new Date("2024-03-30"),
        gmv: 38000000n,
        transactionCount: 4,
        newCustomers: 2,
        activeCustomers: 22,
        openTickets: 5,
        avgResponseTimeMinutes: 45.2,
      },
      {
        date: new Date("2024-03-31"),
        gmv: 91000000n,
        transactionCount: 11,
        newCustomers: 8,
        activeCustomers: 52,
        openTickets: 2,
        avgResponseTimeMinutes: 18.7,
      },
      {
        date: new Date("2024-04-01"),
        gmv: 120000000n,
        transactionCount: 14,
        newCustomers: 12,
        activeCustomers: 67,
        openTickets: 3,
        avgResponseTimeMinutes: 22.1,
      },
      {
        date: new Date("2024-04-02"),
        gmv: 55000000n,
        transactionCount: 6,
        newCustomers: 4,
        activeCustomers: 31,
        openTickets: 4,
        avgResponseTimeMinutes: 35.0,
      },
      {
        date: new Date("2024-04-03"),
        gmv: 78000000n,
        transactionCount: 9,
        newCustomers: 6,
        activeCustomers: 44,
        openTickets: 3,
        avgResponseTimeMinutes: 29.5,
      },
    ],
  });

  console.log("✓ Daily metrics created");

  // ── 26. Blog (existing tables) ────────────────────────────────────────────
  const blogUser1 = await prisma.blog_users.upsert({
    where: { email: "penulis@dexhome.id" },
    update: {},
    create: {
      email: "penulis@dexhome.id",
      display_name: "Tim Konten DexHome",
      bio: "Tim editorial DexHome yang membahas tren furnitur dan dekorasi rumah.",
    },
  });

  const blogPost1 = await prisma.blog_posts.upsert({
    where: { slug: "5-tren-furnitur-2024" },
    update: {},
    create: {
      user_id: blogUser1.id,
      title: "5 Tren Furnitur yang Mendominasi 2024",
      slug: "5-tren-furnitur-2024",
      content:
        "Tahun 2024 membawa banyak perubahan dalam dunia desain interior. Berikut adalah 5 tren furnitur yang paling banyak diminati...",
      published: true,
      published_at: new Date("2024-02-01"),
    },
  });

  const blogPost2 = await prisma.blog_posts.upsert({
    where: { slug: "panduan-memilih-sofa" },
    update: {},
    create: {
      user_id: blogUser1.id,
      title: "Panduan Lengkap Memilih Sofa untuk Ruang Tamu",
      slug: "panduan-memilih-sofa",
      content:
        "Memilih sofa yang tepat bisa membuat atau menghancurkan estetika ruang tamu Anda. Panduan ini akan membantu Anda membuat pilihan terbaik...",
      published: true,
      published_at: new Date("2024-03-01"),
    },
  });

  const blogUser2 = await prisma.blog_users.upsert({
    where: { email: "pembaca@gmail.com" },
    update: {},
    create: {
      email: "pembaca@gmail.com",
      display_name: "Rina Wijaya",
      bio: null,
    },
  });

  await prisma.blog_comments.createMany({
    skipDuplicates: true,
    data: [
      {
        post_id: blogPost1.id,
        user_id: blogUser2.id,
        body: "Artikel yang sangat informatif! Japandi memang sedang booming ya.",
      },
      {
        post_id: blogPost2.id,
        user_id: blogUser2.id,
        body: "Terima kasih panduannya, membantu banget untuk saya yang baru mau beli sofa pertama!",
      },
    ],
  });

  console.log("✓ Blog data created");

  console.log("\n✅ Seeding complete!");
  console.log("\n── Test Accounts (password: password123) ───────────────────");
  console.log("CENTER_ADMIN : admin@dexhome.id");
  console.log("CS Agent     : agent@dexhome.id");
  console.log("MITRA_ADMIN  : admin@furniturejaya.id / admin@homestyle.id / admin@rumahindah.id");
  console.log("MITRA_USER   : staff1@furniturejaya.id / staff2@homestyle.id");
  console.log("CUSTOMER     : budi.santoso@gmail.com / siti.rahayu@gmail.com / ahmad.fauzi@gmail.com");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
