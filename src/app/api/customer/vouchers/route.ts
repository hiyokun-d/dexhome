import { prisma } from "@/lib/prisma";
import { ok, err } from "@/lib/api-response";
import type { NextRequest } from "next/server";

// GET /api/customer/vouchers?customerId=<uuid>&includeUsed=false
// TODO: replace customerId param with session.profileId once auth is wired
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const customerId = searchParams.get("customerId");
    if (!customerId) return err("customerId required", 400);

    const includeUsed = searchParams.get("includeUsed") === "true";
    const now = new Date();

    const claims = await prisma.voucherClaim.findMany({
      where: {
        customerId,
        ...(includeUsed ? {} : { usedAt: null }),
        voucher: { validUntil: { gte: now } },
      },
      orderBy: { voucher: { validUntil: "asc" } },
      select: {
        id: true,
        usedAt: true,
        orderId: true,
        voucher: {
          select: {
            id: true,
            code: true,
            name: true,
            type: true,
            value: true,
            minPurchase: true,
            pointsCost: true,
            validFrom: true,
            validUntil: true,
          },
        },
      },
    });

    return ok(claims);
  } catch (e) {
    console.error("[GET /api/customer/vouchers]", e);
    return err("Failed to fetch vouchers", 500);
  }
}
