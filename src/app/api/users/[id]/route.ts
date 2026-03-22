import { prisma } from "@/lib/prisma";

// GET /api/users/[id] — fetch a single user
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const user = await prisma.user.findUnique({
    where: { id: Number(id) },
  });

  if (!user) {
    return Response.json({ error: "User not found" }, { status: 404 });
  }

  return Response.json(user);
}

// PATCH /api/users/[id] — update a user
// Body: { "name": "New Name" }
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const body = await request.json();

  const user = await prisma.user.update({
    where: { id: Number(id) },
    data: body,
  });

  return Response.json(user);
}

// DELETE /api/users/[id] — delete a user
export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  await prisma.user.delete({
    where: { id: Number(id) },
  });

  return new Response(null, { status: 204 });
}
