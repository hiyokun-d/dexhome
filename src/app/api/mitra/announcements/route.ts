import { prisma } from "@/lib/prisma";
import { ok, err } from "@/lib/api-response";
import type { NextRequest } from "next/server";

// GET /api/mitra/announcements?mitraId=<id>&category=<cat>
export async function GET(req: NextRequest) {
  try {
    const mitraId = req.nextUrl.searchParams.get("mitraId");
    const category = req.nextUrl.searchParams.get("category");
    if (!mitraId) return err("mitraId required", 400);

    const mitra = await prisma.mitraProfile.findUnique({
      where: { id: mitraId },
      select: {
        status: true,
        announcementReads: { select: { announcementId: true } },
      },
    });
    if (!mitra) return err("Mitra not found", 404);

    const readIds = new Set(mitra.announcementReads.map((r) => r.announcementId));

    const announcements = await prisma.announcement.findMany({
      where: {
        publishedAt: { lte: new Date() },
        OR: [
          { target: "ALL_MITRA" },
          ...(mitra.status === "ACTIVE" ? [{ target: "VERIFIED_MITRA" as const }] : []),
        ],
        ...(category && category !== "ALL" ? { category: category as never } : {}),
      },
      orderBy: [{ priority: "desc" }, { publishedAt: "desc" }],
      select: {
        id: true,
        title: true,
        content: true,
        category: true,
        priority: true,
        target: true,
        attachmentUrl: true,
        publishedAt: true,
        creator: { select: { email: true } },
      },
    });

    return ok(announcements.map((a) => ({ ...a, isRead: readIds.has(a.id) })));
  } catch (e) {
    console.error("[GET /api/mitra/announcements]", e);
    return err("Failed to fetch announcements", 500);
  }
}
