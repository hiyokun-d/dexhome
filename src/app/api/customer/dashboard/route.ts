import { prisma } from "@/lib/prisma";
import { ok, err } from "@/lib/api-response";
import type { NextRequest } from "next/server";

// GET /api/customer/dashboard?customerId=<uuid>
// TODO: replace customerId param with session.profileId once auth is wired
export async function GET(req: NextRequest) {
  try {
    const customerId = req.nextUrl.searchParams.get("customerId");
    if (!customerId) return err("customerId required", 400);

    const profile = await prisma.customerProfile.findUnique({
      where: { id: customerId },
      select: {
        id: true,
        fullName: true,
        membershipTier: true,
        totalPoints: true,
        tierExpiresAt: true,
        avatarUrl: true,
        orders: {
          orderBy: { createdAt: "desc" },
          take: 5,
          select: {
            id: true,
            orderNumber: true,
            status: true,
            totalAmount: true,
            createdAt: true,
            mitra: { select: { showroomName: true } },
            items: {
              take: 1,
              select: {
                product: {
                  select: {
                    name: true,
                    images: { orderBy: { order: "asc" }, take: 1, select: { url: true } },
                  },
                },
              },
            },
          },
        },
        voucherClaims: {
          where: {
            usedAt: null,
            voucher: { validUntil: { gte: new Date() } },
          },
          select: {
            voucher: {
              select: {
                id: true,
                code: true,
                name: true,
                type: true,
                value: true,
                validUntil: true,
              },
            },
          },
        },
        pointTransactions: {
          orderBy: { createdAt: "desc" },
          take: 5,
          select: {
            id: true,
            type: true,
            amount: true,
            description: true,
            createdAt: true,
          },
        },
        _count: {
          select: { orders: true, reviews: true, warrantyClaims: true },
        },
      },
    });

    if (!profile) return err("Customer not found", 404);

    return ok(profile);
  } catch (e) {
    console.error("[GET /api/customer/dashboard]", e);
    return err("Failed to fetch dashboard", 500);
  }
}
