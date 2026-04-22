import { prisma } from "@/lib/prisma";
import { ok, err } from "@/lib/api-response";

// GET /api/dev/agents — seeded CENTER_ADMIN users for dev/testing
// REMOVE or gate before production
export async function GET() {
  try {
    const agents = await prisma.user.findMany({
      where: { role: "CENTER_ADMIN" },
      select: { id: true, email: true },
      orderBy: { email: "asc" },
    });
    return ok(agents);
  } catch (e) {
    console.error("[GET /api/dev/agents]", e);
    return err("Failed", 500);
  }
}
