import { prisma } from "@/lib/prisma";
import { ok, err } from "@/lib/api-response";

// GET /api/dev/customers
// Returns seeded customer profiles for dev/testing.
// REMOVE or gate behind auth before production.
export async function GET() {
  if (process.env.NODE_ENV === "production") {
    return err("Not available in production", 403);
  }
  try {
    const customers = await prisma.customerProfile.findMany({
      select: {
        id: true,
        fullName: true,
        membershipTier: true,
        totalPoints: true,
        user: { select: { email: true } },
      },
      orderBy: { fullName: "asc" },
    });
    return ok(customers);
  } catch (e) {
    console.error("[GET /api/dev/customers]", e);
    return err("Failed", 500);
  }
}
