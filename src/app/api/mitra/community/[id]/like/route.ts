import { prisma } from "@/lib/prisma";
import { ok, err } from "@/lib/api-response";
import type { NextRequest } from "next/server";

// POST /api/mitra/community/[id]/like  body: { mitraId }
export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id: postId } = await params;
    const { mitraId } = await req.json();
    if (!mitraId) return err("mitraId required", 400);

    const existing = await prisma.communityLike.findUnique({
      where: { postId_mitraId: { postId, mitraId } },
    });

    if (existing) {
      await prisma.$transaction([
        prisma.communityLike.delete({ where: { postId_mitraId: { postId, mitraId } } }),
        prisma.communityPost.update({ where: { id: postId }, data: { likesCount: { decrement: 1 } } }),
      ]);
      return ok({ liked: false });
    }

    await prisma.$transaction([
      prisma.communityLike.create({ data: { postId, mitraId } }),
      prisma.communityPost.update({ where: { id: postId }, data: { likesCount: { increment: 1 } } }),
    ]);
    return ok({ liked: true });
  } catch (e) {
    console.error("[POST /api/mitra/community/[id]/like]", e);
    return err("Failed to toggle like", 500);
  }
}
