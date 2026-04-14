import { prisma } from "@/lib/prisma";
import { ok, err } from "@/lib/api-response";
import type { NextRequest } from "next/server";

// GET /api/customer/cs/[id]?customerId=<uuid>
// Returns ticket + full message thread
// TODO: replace customerId param with session.profileId once auth is wired
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const customerId = req.nextUrl.searchParams.get("customerId");
    if (!customerId) return err("customerId required", 400);

    const ticket = await prisma.cSTicket.findUnique({
      where: { id },
      select: {
        id: true,
        ticketNumber: true,
        subject: true,
        status: true,
        priority: true,
        createdAt: true,
        updatedAt: true,
        resolvedAt: true,
        assignedAgent: {
          select: { id: true, email: true },
        },
        messages: {
          orderBy: { createdAt: "asc" },
          select: {
            id: true,
            content: true,
            senderRole: true,
            attachmentUrl: true,
            createdAt: true,
            sender: { select: { id: true, email: true } },
          },
        },
      },
    });

    if (!ticket) return err("Ticket not found", 404);
    // ensure the ticket belongs to this customer
    if (ticket.id !== id) return err("Not found", 404);

    // re-fetch to verify ownership
    const owned = await prisma.cSTicket.findFirst({
      where: { id, customerId },
      select: { id: true },
    });
    if (!owned) return err("Forbidden", 403);

    return ok(ticket);
  } catch (e) {
    console.error("[GET /api/customer/cs/[id]]", e);
    return err("Failed to fetch ticket", 500);
  }
}
