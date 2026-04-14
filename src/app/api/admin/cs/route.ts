import { prisma } from "@/lib/prisma";
import { ok, err, paginated } from "@/lib/api-response";
import type { NextRequest } from "next/server";

// GET /api/admin/cs?page=1&status=OPEN&search=<text>
// TODO: gate behind CENTER_ADMIN role check once auth is wired
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const page = Math.max(1, Number(searchParams.get("page") ?? 1));
    const limit = 20;
    const status = searchParams.get("status") ?? undefined;
    const search = searchParams.get("search")?.trim() ?? undefined;

    const where = {
      ...(status ? { status: status as never } : {}),
      ...(search
        ? {
            OR: [
              { subject: { contains: search, mode: "insensitive" as const } },
              { ticketNumber: { contains: search, mode: "insensitive" as const } },
              { customer: { fullName: { contains: search, mode: "insensitive" as const } } },
            ],
          }
        : {}),
    };

    const [total, tickets] = await Promise.all([
      prisma.cSTicket.count({ where }),
      prisma.cSTicket.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: [{ status: "asc" }, { updatedAt: "desc" }],
        select: {
          id: true,
          ticketNumber: true,
          subject: true,
          status: true,
          priority: true,
          createdAt: true,
          updatedAt: true,
          customer: { select: { id: true, fullName: true, membershipTier: true, avatarUrl: true } },
          assignedAgent: { select: { id: true, email: true } },
          messages: {
            orderBy: { createdAt: "desc" },
            take: 1,
            select: { content: true, senderRole: true, createdAt: true },
          },
          _count: { select: { messages: true } },
        },
      }),
    ]);

    return paginated(tickets, total, page, limit);
  } catch (e) {
    console.error("[GET /api/admin/cs]", e);
    return err("Failed to fetch tickets", 500);
  }
}
