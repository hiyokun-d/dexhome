import { prisma } from "@/lib/prisma";
import { ok, err, paginated } from "@/lib/api-response";
import type { NextRequest } from "next/server";

// GET /api/item?page=1&limit=12&category=<slug>
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const page = Math.max(1, Number(searchParams.get("page") ?? 1));
    const limit = Math.min(48, Math.max(1, Number(searchParams.get("limit") ?? 12)));
    const categorySlug = searchParams.get("category");

    const where = {
      status: "ACTIVE" as const,
      ...(categorySlug ? { category: { slug: categorySlug } } : {}),
    };

    const [total, items] = await Promise.all([
      prisma.product.count({ where }),
      prisma.product.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          name: true,
          price: true,
          originalPrice: true,
          pointsPerTxn: true,
          memberDiscountPct: true,
          mitra: { select: { showroomName: true } },
          category: { select: { name: true, icon: true } },
          images: {
            orderBy: { order: "asc" },
            take: 1,
            select: { url: true },
          },
          _count: { select: { reviews: true } },
        },
      }),
    ]);

    // compute avg rating per product in one extra query, grouped
    const productIds = items.map((i: { id: string }) => i.id);
    const ratings = await prisma.productReview.groupBy({
      by: ["productId"],
      where: { productId: { in: productIds } },
      _avg: { rating: true },
    });
    const ratingMap = Object.fromEntries(
      ratings.map((r: { productId: string; _avg: { rating: number | null } }) => [r.productId, r._avg.rating]),
    );

    const data = items.map(({ _count, ...item }) => ({
      ...item,
      avgRating: ratingMap[item.id] ?? null,
      reviewCount: _count.reviews,
    }));

    return paginated(data, total, page, limit);
  } catch (e) {
    console.error("[GET /api/item]", e);
    return err("Failed to fetch products", 500);
  }
}
