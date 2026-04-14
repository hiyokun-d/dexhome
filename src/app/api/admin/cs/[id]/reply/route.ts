import { prisma } from "@/lib/prisma";
import { ok, err } from "@/lib/api-response";
import type { NextRequest } from "next/server";

// POST /api/admin/cs/[id]/reply
// Body: { agentUserId: string, content: string, attachmentUrl?: string }
// TODO: replace agentUserId with session.userId once auth is wired
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { agentUserId, content, attachmentUrl } = body ?? {};

    if (!agentUserId) return err("agentUserId required", 400);
    if (!content || typeof content !== "string" || content.trim().length === 0) {
      return err("content required", 400);
    }
    if (content.trim().length > 2000) return err("content exceeds 2000 characters", 400);

    const ticket = await prisma.cSTicket.findUnique({
      where: { id },
      select: { id: true, status: true },
    });

    if (!ticket) return err("Ticket not found", 404);
    if (ticket.status === "CLOSED") return err("Ticket is closed", 400);

    const [message] = await prisma.$transaction([
      prisma.cSMessage.create({
        data: {
          ticketId: id,
          senderId: agentUserId,
          senderRole: "AGENT",
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
      }),
      prisma.cSTicket.update({
        where: { id },
        data: { status: "ANSWERED" },
      }),
    ]);

    return ok(message, 201);
  } catch (e) {
    console.error("[POST /api/admin/cs/[id]/reply]", e);
    return err("Failed to send reply", 500);
  }
}
