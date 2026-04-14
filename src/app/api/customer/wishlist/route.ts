import { prisma } from "@/lib/prisma";
import { ok, err } from "@/lib/api-response";
import type { NextRequest } from "next/server";
// GET  /api/customer/wishlist?customerId=<uuid>
// POST /api/customer/wishlist        { customerId, productId } — toggle (add or remove)
// TODO: replace customerId with session.profileId once auth is wired

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function GET(req: NextRequest) {
  try {
    const customerId = req.nextUrl.searchParams.get("customerId");
    if (!customerId) return err("customerId required", 400);

    const items = await prisma.wishlist.findMany({
      where: { customerId },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        createdAt: true,
        product: {
          select: {
            id: true,
            name: true,
            price: true,
            originalPrice: true,
            pointsPerTxn: true,
            status: true,
            mitra: { select: { showroomName: true, city: true } },
            category: { select: { name: true, icon: true } },
            images: { orderBy: { order: "asc" }, take: 1, select: { url: true } },
          },
        },
      },
    });

    return ok(items);
  } catch (e) {
    console.error("[GET /api/customer/wishlist]", e);
    return err("Failed to fetch wishlist", 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { customerId, productId } = body ?? {};
    if (!customerId || !UUID.test(customerId)) return err("Invalid customerId", 400);
    if (!productId || !UUID.test(productId)) return err("Invalid productId", 400);

    const existing = await prisma.wishlist.findUnique({
      where: { customerId_productId: { customerId, productId } },
    });

    if (existing) {
      await prisma.wishlist.delete({
        where: { customerId_productId: { customerId, productId } },
      });
      return ok({ wishlisted: false });
    }

    await prisma.wishlist.create({ data: { customerId, productId } });
    return ok({ wishlisted: true });
  } catch (e) {
    console.error("[POST /api/customer/wishlist]", e);
    return err("Failed to toggle wishlist", 500);
  }
}
