import { prisma } from "@/lib/prisma";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const item = await prisma.product.findUnique({
    where: { id },
    include: {
      images: {
        orderBy: { order: "asc" },
      },
      reviews: {
        orderBy: { order: "asc" },
      },
    },
  });

  if (!item) {
    return Response.json({ error: "Product not found" }, { status: 404 });
  }

  return Response.json(item);
}
