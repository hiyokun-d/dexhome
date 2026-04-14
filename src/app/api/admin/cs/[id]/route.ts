import { prisma } from "@/lib/prisma";
import { ok, err } from "@/lib/api-response";
import type { NextRequest } from "next/server";

// GET /api/admin/cs/[id]  — ticket + full message thread
// PATCH /api/admin/cs/[id] — update status or assignedAgentId
// TODO: gate behind CENTER_ADMIN role check once auth is wired

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

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
        customer: {
          select: {
            id: true,
            fullName: true,
            membershipTier: true,
            avatarUrl: true,
            user: { select: { email: true } },
          },
        },
        assignedAgent: { select: { id: true, email: true } },
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
    return ok(ticket);
  } catch (e) {
    console.error("[GET /api/admin/cs/[id]]", e);
    return err("Failed to fetch ticket", 500);
  }
}

// PATCH /api/admin/cs/[id]
// Body: { status?: CSTicketStatus, assignedAgentId?: string }
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { status, assignedAgentId } = body ?? {};

    const validStatuses = ["OPEN", "ANSWERED", "RESOLVED", "CLOSED"];
    if (status && !validStatuses.includes(status)) {
      return err("Invalid status", 400);
    }

    const updated = await prisma.cSTicket.update({
      where: { id },
      data: {
        ...(status ? { status } : {}),
        ...(assignedAgentId !== undefined ? { assignedAgentId } : {}),
        ...(status === "RESOLVED" ? { resolvedAt: new Date() } : {}),
      },
      select: {
        id: true,
        status: true,
        assignedAgentId: true,
        resolvedAt: true,
        updatedAt: true,
      },
    });

    return ok(updated);
  } catch (e) {
    console.error("[PATCH /api/admin/cs/[id]]", e);
    return err("Failed to update ticket", 500);
  }
}
