import { prisma } from "@/lib/prisma";
import { ok, err } from "@/lib/api-response";

// GET /api/users/[id]
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const user = await prisma.user.findUnique({
      where: { id },
      select: { id: true, email: true, phone: true, role: true, createdAt: true },
    });
    if (!user) return err("User not found", 404);
    return ok(user);
  } catch (e) {
    console.error("[GET /api/users/[id]]", e);
    return err("Failed to fetch user", 500);
  }
}

// PATCH /api/users/[id]
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const user = await prisma.user.update({
      where: { id },
      data: body,
      select: { id: true, email: true, phone: true, role: true },
    });
    return ok(user);
  } catch (e) {
    console.error("[PATCH /api/users/[id]]", e);
    return err("Failed to update user", 500);
  }
}

// DELETE /api/users/[id]
export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    await prisma.user.delete({ where: { id } });
    return new Response(null, { status: 204 });
  } catch (e) {
    console.error("[DELETE /api/users/[id]]", e);
    return err("Failed to delete user", 500);
  }
}
