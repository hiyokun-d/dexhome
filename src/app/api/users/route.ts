import { prisma } from "@/lib/prisma";
import { ok, err } from "@/lib/api-response";

// GET /api/users
export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, email: true, phone: true, role: true, createdAt: true },
    });
    return ok(users);
  } catch (e) {
    console.error("[GET /api/users]", e);
    return err("Failed to fetch users", 500);
  }
}

// POST /api/users — { email, phone, passwordHash, role }
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, phone, passwordHash, role } = body;

    if (!email || !phone || !passwordHash || !role) {
      return err("email, phone, passwordHash, and role are required", 400);
    }

    const user = await prisma.user.create({
      data: { email, phone, passwordHash, role },
      select: { id: true, email: true, phone: true, role: true, createdAt: true },
    });

    return ok(user, 201);
  } catch (e) {
    console.error("[POST /api/users]", e);
    return err("Failed to create user", 500);
  }
}
