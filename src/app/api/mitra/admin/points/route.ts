import { prisma } from "@/lib/prisma";
import { ok, err } from "@/lib/api-response";
import { z } from "zod/v4";
import type { NextRequest } from "next/server";

const PointsSchema = z.object({
  mitraId: z.string().uuid(),
  customerId: z.string().uuid(),
  transactionAmount: z.number().int().min(500_000, "Minimum transaksi Rp 500.000"),
  description: z.string().min(1).max(500),
  referenceId: z.string().optional(),
});

// GET /api/mitra/admin/points?mitraId=<id>  — today's input summary
export async function GET(req: NextRequest) {
  try {
    const mitraId = req.nextUrl.searchParams.get("mitraId");
    if (!mitraId) return err("mitraId required", 400);

    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const [count, sum] = await Promise.all([
      prisma.pointTransaction.count({ where: { inputByMitraId: mitraId, createdAt: { gte: todayStart } } }),
      prisma.pointTransaction.aggregate({
        where: { inputByMitraId: mitraId, createdAt: { gte: todayStart } },
        _sum: { amount: true },
      }),
    ]);

    return ok({ todayCount: count, todayPoints: sum._sum.amount ?? 0, dailyLimit: 10 });
  } catch (e) {
    console.error("[GET /api/mitra/admin/points]", e);
    return err("Failed to fetch point summary", 500);
  }
}

// POST /api/mitra/admin/points
export async function POST(req: NextRequest) {
  try {
    const body = PointsSchema.safeParse(await req.json());
    if (!body.success) return err(body.error.issues[0].message, 400);
    const { mitraId, customerId, transactionAmount, description, referenceId } = body.data;

    // Daily limit check
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todayCount = await prisma.pointTransaction.count({
      where: { inputByMitraId: mitraId, createdAt: { gte: todayStart } },
    });
    if (todayCount >= 10) return err("Batas input harian (10) tercapai", 429);

    const points = Math.floor(transactionAmount / 10_000);

    const txn = await prisma.$transaction(async (tx) => {
      const t = await tx.pointTransaction.create({
        data: {
          customerId,
          type: "EARN",
          amount: points,
          referenceType: "MANUAL",
          referenceId: referenceId ?? null,
          description,
          inputByMitraId: mitraId,
        },
        select: { id: true, amount: true, createdAt: true },
      });
      await tx.customerProfile.update({
        where: { id: customerId },
        data: { totalPoints: { increment: points } },
      });
      return t;
    });

    return ok({ ...txn, pointsAwarded: points }, 201);
  } catch (e) {
    console.error("[POST /api/mitra/admin/points]", e);
    return err("Failed to input points", 500);
  }
}
