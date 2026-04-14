import { prisma } from "@/lib/prisma";
import { ok, err, paginated } from "@/lib/api-response";
import type { NextRequest } from "next/server";

// GET /api/customer/orders?customerId=<uuid>&page=1&limit=10&status=<OrderStatus>
// TODO: replace customerId param with session.profileId once auth is wired
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const customerId = searchParams.get("customerId");
    if (!customerId) return err("customerId required", 400);

    const page = Math.max(1, Number(searchParams.get("page") ?? 1));
    const limit = Math.min(50, Math.max(1, Number(searchParams.get("limit") ?? 10)));
    const status = searchParams.get("status") ?? undefined;

    const where = {
      customerId,
      ...(status ? { status: status as never } : {}),
    };

    const [total, orders] = await Promise.all([
      prisma.order.count({ where }),
      prisma.order.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          orderNumber: true,
          status: true,
          totalAmount: true,
          discountAmount: true,
          pointsEarned: true,
          pointsUsed: true,
          paymentMethod: true,
          createdAt: true,
          updatedAt: true,
          mitra: { select: { showroomName: true, city: true, logoUrl: true } },
          items: {
            select: {
              id: true,
              quantity: true,
              unitPrice: true,
              subtotal: true,
              product: {
                select: {
                  id: true,
                  name: true,
                  images: { orderBy: { order: "asc" }, take: 1, select: { url: true } },
                },
              },
              variant: { select: { size: true, color: true, colorHex: true } },
            },
          },
        },
      }),
    ]);

    return paginated(orders, total, page, limit);
  } catch (e) {
    console.error("[GET /api/customer/orders]", e);
    return err("Failed to fetch orders", 500);
  }
}
