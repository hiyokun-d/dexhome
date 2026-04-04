import { prisma } from "@/lib/prisma";
import { ok, err } from "@/lib/api-response";
import type { NextRequest } from "next/server";

// GET /api/item/category          — list all categories
// GET /api/item/category?slug=sofa — products in that category
export async function GET(req: NextRequest) {
  try {
    const slug = req.nextUrl.searchParams.get("slug");

    if (!slug) {
      const categories = await prisma.category.findMany({
        orderBy: { name: "asc" },
        select: { id: true, name: true, slug: true, icon: true },
      });
      return ok(categories);
    }

    const category = await prisma.category.findUnique({
      where: { slug },
      select: { id: true, name: true, icon: true },
    });

    if (!category) return err("Category not found", 404);

    const products = await prisma.product.findMany({
      where: { categoryId: category.id, status: "ACTIVE" },
      select: {
        id: true,
        name: true,
        price: true,
        originalPrice: true,
        pointsPerTxn: true,
        mitra: { select: { showroomName: true } },
        images: {
          orderBy: { order: "asc" },
          take: 1,
          select: { url: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return ok({ category, products });
  } catch (e) {
    console.error("[GET /api/item/category]", e);
    return err("Failed to fetch category", 500);
  }
}
