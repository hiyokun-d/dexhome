import { prisma } from "@/lib/prisma";
import { ok, err } from "@/lib/api-response";
import { z } from "zod/v4";
import type { NextRequest } from "next/server";

// GET /api/mitra/admin/stock?mitraId=<id>
export async function GET(req: NextRequest) {
  try {
    const mitraId = req.nextUrl.searchParams.get("mitraId");
    if (!mitraId) return err("mitraId required", 400);

    const stockItems = await prisma.stockPerShowroom.findMany({
      where: { mitraId },
      select: {
        id: true,
        quantity: true,
        minQuantity: true,
        updatedAt: true,
        product: {
          select: {
            id: true,
            sku: true,
            name: true,
            status: true,
            price: true,
            images: { select: { url: true }, orderBy: { order: "asc" }, take: 1 },
          },
        },
        variant: { select: { id: true, size: true, color: true, skuSuffix: true } },
      },
      orderBy: { quantity: "asc" },
    });

    return ok(stockItems);
  } catch (e) {
    console.error("[GET /api/mitra/admin/stock]", e);
    return err("Failed to fetch stock", 500);
  }
}

const UpdateSchema = z.object({
  mitraId: z.string().uuid(),
  stockItemId: z.string().uuid(),
  quantity: z.number().int().min(0),
});

// PATCH /api/mitra/admin/stock  body: { mitraId, stockItemId, quantity }
export async function PATCH(req: NextRequest) {
  try {
    const body = UpdateSchema.safeParse(await req.json());
    if (!body.success) return err(body.error.issues[0].message, 400);
    const { mitraId, stockItemId, quantity } = body.data;

    const updated = await prisma.stockPerShowroom.update({
      where: { id: stockItemId, mitraId },
      data: { quantity },
      select: { id: true, quantity: true, minQuantity: true, updatedAt: true },
    });

    return ok(updated);
  } catch (e) {
    console.error("[PATCH /api/mitra/admin/stock]", e);
    return err("Failed to update stock", 500);
  }
}
