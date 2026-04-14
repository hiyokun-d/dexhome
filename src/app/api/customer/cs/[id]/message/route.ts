import { prisma } from "@/lib/prisma";
import { ok, err } from "@/lib/api-response";
import type { NextRequest } from "next/server";

// POST /api/customer/cs/[id]/message
// Body: { customerId: string, content: string, attachmentUrl?: string }
// TODO: replace customerId param with session info once auth is wired
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { customerId, content, attachmentUrl } = body ?? {};

    if (!customerId) return err("customerId required", 400);
    if (!content || typeof content !== "string" || content.trim().length === 0) {
      return err("content required", 400);
    }
    if (content.trim().length > 2000) {
      return err("content exceeds 2000 characters", 400);
    }

    // verify ticket ownership + not closed
    const ticket = await prisma.cSTicket.findFirst({
      where: { id, customerId },
      select: { id: true, status: true, customer: { select: { userId: true } } },
    });

    if (!ticket) return err("Ticket not found", 404);
    if (ticket.status === "CLOSED") return err("Ticket is closed", 400);

    const message = await prisma.cSMessage.create({
      data: {
        ticketId: id,
        senderId: ticket.customer.userId,
        senderRole: "CUSTOMER",
        content: content.trim(),
        ...(attachmentUrl ? { attachmentUrl } : {}),
      },
      select: {
        id: true,
        content: true,
        senderRole: true,
        attachmentUrl: true,
        createdAt: true,
        sender: { select: { id: true, email: true } },
      },
    });

    // bump ticket status back to OPEN if it was ANSWERED
    if (ticket.status === "ANSWERED") {
      await prisma.cSTicket.update({
        where: { id },
        data: { status: "OPEN" },
      });
    }

    return ok(message, 201);
  } catch (e) {
    console.error("[POST /api/customer/cs/[id]/message]", e);
    return err("Failed to send message", 500);
  }
}
