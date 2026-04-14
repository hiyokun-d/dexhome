import { prisma } from "@/lib/prisma";
import { ok, err } from "@/lib/api-response";
import type { NextRequest } from "next/server";

// GET /api/mitra/catalog?mitraId=<id>
export async function GET(req: NextRequest) {
  try {
    const mitraId = req.nextUrl.searchParams.get("mitraId");
    if (!mitraId) return err("mitraId required", 400);

    const products = await prisma.product.findMany({
      where: { mitraId },
      orderBy: { name: "asc" },
      select: {
        id: true,
        sku: true,
        name: true,
        price: true,
        originalPrice: true,
        status: true,
        category: { select: { name: true } },
        images: { select: { url: true }, orderBy: { order: "asc" }, take: 1 },
        stockItems: {
          where: { mitraId },
          select: { quantity: true, minQuantity: true },
          take: 1,
        },
        _count: { select: { orderItems: true } },
      },
    });

    return ok(products);
  } catch (e) {
    console.error("[GET /api/mitra/catalog]", e);
    return err("Failed to fetch catalog", 500);
  }
}
