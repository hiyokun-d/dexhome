import { prisma } from "@/lib/prisma";
import { ok, err, paginated } from "@/lib/api-response";
import type { NextRequest } from "next/server";

// GET /api/customer/cs?customerId=<uuid>&page=1&status=OPEN
// TODO: replace customerId param with session.profileId once auth is wired
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const customerId = searchParams.get("customerId");
    if (!customerId) return err("customerId required", 400);

    const page = Math.max(1, Number(searchParams.get("page") ?? 1));
    const limit = 20;
    const status = searchParams.get("status") ?? undefined;

    const where = {
      customerId,
      ...(status ? { status: status as never } : {}),
    };

    const [total, tickets] = await Promise.all([
      prisma.cSTicket.count({ where }),
      prisma.cSTicket.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { updatedAt: "desc" },
        select: {
          id: true,
          ticketNumber: true,
          subject: true,
          status: true,
          priority: true,
          createdAt: true,
          updatedAt: true,
          assignedAgent: { select: { id: true } },
          messages: {
            orderBy: { createdAt: "desc" },
            take: 1,
            select: {
              content: true,
              senderRole: true,
              createdAt: true,
            },
          },
          _count: { select: { messages: true } },
        },
      }),
    ]);

    return paginated(tickets, total, page, limit);
  } catch (e) {
    console.error("[GET /api/customer/cs]", e);
    return err("Failed to fetch tickets", 500);
  }
}

// POST /api/customer/cs
// Body: { customerId: string, subject: string }
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { customerId, subject } = body ?? {};

    if (!customerId) return err("customerId required", 400);
    if (!subject || typeof subject !== "string" || subject.trim().length < 5) {
      return err("subject must be at least 5 characters", 400);
    }

    // generate ticket number: TKT-XXXXXX (6 random hex chars)
    const hex = Math.random().toString(16).slice(2, 8).toUpperCase();
    const ticketNumber = `TKT-${hex}`;

    const ticket = await prisma.cSTicket.create({
      data: {
        ticketNumber,
        customerId,
        subject: subject.trim(),
        status: "OPEN",
        priority: "NORMAL",
      },
      select: {
        id: true,
        ticketNumber: true,
        subject: true,
        status: true,
        priority: true,
        createdAt: true,
      },
    });

    return ok(ticket, 201);
  } catch (e) {
    console.error("[POST /api/customer/cs]", e);
    return err("Failed to create ticket", 500);
  }
}
