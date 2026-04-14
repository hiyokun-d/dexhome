import { prisma } from "@/lib/prisma";
import { ok, err } from "@/lib/api-response";

// GET /api/dev/mitras
// Dev-only: returns mitra profiles for testing without auth
export async function GET() {
  if (process.env.NODE_ENV === "production") {
    return err("Not available in production", 403);
  }
  try {
    const mitras = await prisma.mitraProfile.findMany({
      select: {
        id: true,
        showroomName: true,
        mitraCode: true,
        city: true,
        status: true,
        user: { select: { email: true } },
      },
      orderBy: { showroomName: "asc" },
    });
    return ok(mitras);
  } catch (e) {
    console.error("[GET /api/dev/mitras]", e);
    return err("Failed to fetch mitra profiles", 500);
  }
}
