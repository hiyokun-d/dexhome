import { prisma } from "@/lib/prisma";
import { ok, err } from "@/lib/api-response";
import type { NextRequest } from "next/server";

// POST /api/mitra/announcements/[id]/read  body: { mitraId }
export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const { mitraId } = await req.json();
    if (!mitraId) return err("mitraId required", 400);

    await prisma.announcementRead.upsert({
      where: { announcementId_mitraId: { announcementId: id, mitraId } },
      create: { announcementId: id, mitraId },
      update: {},
    });

    return ok({ announcementId: id, mitraId });
  } catch (e) {
    console.error("[POST /api/mitra/announcements/[id]/read]", e);
    return err("Failed to mark read", 500);
  }
}
