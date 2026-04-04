import { prisma } from "@/lib/prisma";

/*
 {
 "id":"35aac467-d0fb-4783-97c8-814bc94f1dbc",
 "sku":"PRD-OUT-001","name":"Set Kursi Taman Rotan",
 "description":"Set kursi taman 4 buah + meja dari rotan sintetis. Tahan cuaca dan UV.",
 "categoryId":"5a1a602e-9692-4dd2-909c-c5faf723bdf0",
 "mitraId":"ed41587d-5e62-4562-85cb-810f3df9e6b5",
 "price":4200000,
 "originalPrice":null,
 "memberDiscountPct":5,
 "pointsPerTxn":420,
 "warrantyMonths":12,
 "warrantyType":"STORE",
 "insuranceAvailable":false,
 "weightKg":25,
 "dimensionsCm":"120Ã—80Ã—70",
 "status":"ACTIVE",
 "createdAt":"2026-04-04T14:29:58.702Z",
 "updatedAt":"2026-04-04T14:29:58.702Z"
 }
 */

export async function GET() {
  const items = await prisma.product.findMany({
    include: {
      images: {
        orderBy: { order: "asc" },
      },
    },
  });
  return Response.json(items);
}
