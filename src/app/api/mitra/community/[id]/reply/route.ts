import { prisma } from "@/lib/prisma";
import { ok, err } from "@/lib/api-response";
import { z } from "zod/v4";
import type { NextRequest } from "next/server";

const ReplySchema = z.object({
  mitraId: z.string().uuid(),
  content: z.string().min(1).max(1000),
});

// POST /api/mitra/community/[id]/reply
export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id: postId } = await params;
    const body = ReplySchema.safeParse(await req.json());
    if (!body.success) return err(body.error.issues[0].message, 400);
    const { mitraId, content } = body.data;

    const reply = await prisma.$transaction(async (tx) => {
      const r = await tx.communityReply.create({
        data: { postId, mitraId, content },
        select: {
          id: true,
          content: true,
          createdAt: true,
          mitra: { select: { id: true, showroomName: true, logoUrl: true } },
        },
      });
      await tx.communityPost.update({ where: { id: postId }, data: { repliesCount: { increment: 1 } } });
      return r;
    });

    return ok(reply, 201);
  } catch (e) {
    console.error("[POST /api/mitra/community/[id]/reply]", e);
    return err("Failed to post reply", 500);
  }
}
