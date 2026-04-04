import { prisma } from "@/lib/prisma";
import { ok, err } from "@/lib/api-response";

// GET /api/item/[id]
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const item = await prisma.product.findUnique({
      where: { id },
      include: {
        mitra: {
          select: { showroomName: true, city: true, logoUrl: true },
        },
        category: { select: { name: true, icon: true } },
        images: { orderBy: { order: "asc" } },
        variants: true,
        reviews: {
          select: {
            rating: true,
            comment: true,
            images: true,
            createdAt: true,
            verifiedPurchase: true,
            customer: { select: { fullName: true, avatarUrl: true } },
          },
          orderBy: { createdAt: "desc" },
          take: 10,
        },
      },
    });

    if (!item) return err("Product not found", 404);

    const avgRating =
      item.reviews.length
        ? item.reviews.reduce((sum, r) => sum + r.rating, 0) / item.reviews.length
        : null;

    return ok({ ...item, avgRating, reviewCount: item.reviews.length });
  } catch (e) {
    console.error("[GET /api/item/[id]]", e);
    return err("Failed to fetch product", 500);
  }
}
