import { prisma } from "@/lib/prisma";
import { ok, err } from "@/lib/api-response";
import type { NextRequest } from "next/server";

// GET /api/mitra/admin/dashboard?mitraId=<id>&days=30
export async function GET(req: NextRequest) {
  try {
    const mitraId = req.nextUrl.searchParams.get("mitraId");
    const days = Number(req.nextUrl.searchParams.get("days") ?? "30");
    if (!mitraId) return err("mitraId required", 400);

    const since = new Date(Date.now() - days * 86_400_000);

    const [orders, stockAlerts, reviews, todayInputs] = await Promise.all([
      prisma.order.findMany({
        where: { mitraId, createdAt: { gte: since } },
        select: {
          id: true,
          orderNumber: true,
          totalAmount: true,
          status: true,
          createdAt: true,
          customer: { select: { fullName: true } },
          items: { select: { product: { select: { name: true } }, quantity: true, unitPrice: true }, take: 1 },
        },
        orderBy: { createdAt: "desc" },
      }),
      prisma.stockPerShowroom.findMany({
        where: { mitraId },
        select: {
          quantity: true,
          minQuantity: true,
          product: { select: { id: true, name: true, sku: true } },
        },
      }).then((rows) => rows.filter((r) => r.quantity <= r.minQuantity)),
      prisma.productReview.aggregate({
        where: { product: { mitraId } },
        _avg: { rating: true },
        _count: { rating: true },
      }),
      prisma.pointTransaction.count({
        where: {
          inputByMitraId: mitraId,
          createdAt: { gte: new Date(new Date().setHours(0, 0, 0, 0)) },
        },
      }),
    ]);

    const completedOrders = orders.filter((o) =>
      ["COMPLETED", "DELIVERED"].includes(o.status)
    );
    const gmv = completedOrders.reduce((s, o) => s + o.totalAmount, 0);

    return ok({
      gmv,
      totalOrders: orders.length,
      stockAlerts,
      avgRating: reviews._avg.rating ?? 0,
      reviewCount: reviews._count.rating,
      todayPointInputs: todayInputs,
      recentOrders: orders.slice(0, 10),
    });
  } catch (e) {
    console.error("[GET /api/mitra/admin/dashboard]", e);
    return err("Failed to fetch dashboard", 500);
  }
}
