import { prisma } from "@/lib/prisma";

// GET /api/users — fetch all users
export async function GET() {
  const users = await prisma.user.findMany();
  return Response.json("We have it here!");
}

// POST /api/users — create a new user
// Body: { "email": "user@example.com", "name": "John" }
export async function POST(request: Request) {
  const body = await request.json();
  const { email, name } = body;

  if (!email) {
    return Response.json({ error: "Email is required" }, { status: 400 });
  }

  const user = await prisma.user.create({
    data: { email, name },
  });

  return Response.json(user, { status: 201 });
}
