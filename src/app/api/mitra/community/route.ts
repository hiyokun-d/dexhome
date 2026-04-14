import { prisma } from "@/lib/prisma";
import { ok, err } from "@/lib/api-response";
import { z } from "zod/v4";
import type { NextRequest } from "next/server";

// GET /api/mitra/community?mitraId=<id>
export async function GET(req: NextRequest) {
  try {
    const mitraId = req.nextUrl.searchParams.get("mitraId");
    if (!mitraId) return err("mitraId required", 400);

    const posts = await prisma.communityPost.findMany({
      where: { status: "ACTIVE" },
      orderBy: { createdAt: "desc" },
      take: 50,
      select: {
        id: true,
        content: true,
        tags: true,
        likesCount: true,
        repliesCount: true,
        createdAt: true,
        mitra: { select: { id: true, showroomName: true, logoUrl: true } },
        likes: { where: { mitraId }, select: { id: true }, take: 1 },
        replies: {
          orderBy: { createdAt: "asc" },
          select: {
            id: true,
            content: true,
            createdAt: true,
            mitra: { select: { id: true, showroomName: true, logoUrl: true } },
          },
        },
      },
    });

    return ok(posts.map((p) => ({ ...p, likedByMe: p.likes.length > 0 })));
  } catch (e) {
    console.error("[GET /api/mitra/community]", e);
    return err("Failed to fetch community posts", 500);
  }
}

const PostSchema = z.object({
  mitraId: z.string().uuid(),
  content: z.string().min(1).max(2000),
  tags: z.array(z.string()).default([]),
});

// POST /api/mitra/community
export async function POST(req: NextRequest) {
  try {
    const body = PostSchema.safeParse(await req.json());
    if (!body.success) return err(body.error.issues[0].message, 400);
    const { mitraId, content, tags } = body.data;

    const post = await prisma.communityPost.create({
      data: { mitraId, content, tags },
      select: {
        id: true,
        content: true,
        tags: true,
        likesCount: true,
        repliesCount: true,
        createdAt: true,
        mitra: { select: { id: true, showroomName: true, logoUrl: true } },
      },
    });

    return ok({ ...post, likedByMe: false, likes: [], replies: [] }, 201);
  } catch (e) {
    console.error("[POST /api/mitra/community]", e);
    return err("Failed to create post", 500);
  }
}
