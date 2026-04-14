import { prisma } from "@/lib/prisma";
import { ok, err } from "@/lib/api-response";
import type { NextRequest } from "next/server";

// GET /api/showrooms?city=<city>
// Returns all ACTIVE mitra with location data for showroom finder + distance calc
export async function GET(req: NextRequest) {
  try {
    const city = req.nextUrl.searchParams.get("city")?.trim() ?? undefined;

    const showrooms = await prisma.mitraProfile.findMany({
      where: {
        status: "ACTIVE",
        ...(city ? { city: { contains: city, mode: "insensitive" } } : {}),
      },
      select: {
        id: true,
        showroomName: true,
        address: true,
        city: true,
        latitude: true,
        longitude: true,
        logoUrl: true,
        _count: {
          select: { products: true },
        },
      },
      orderBy: { showroomName: "asc" },
    });

    return ok(showrooms);
  } catch (e) {
    console.error("[GET /api/showrooms]", e);
    return err("Failed to fetch showrooms", 500);
  }
}
