import { prisma } from "@/lib/prisma";
import { ok, err } from "@/lib/api-response";

// GET /api/item/[id]/availability
// Returns all showrooms that have this product in stock (quantity > 0),
// including mitra location data for distance calculation on the client.
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const stocks = await prisma.stockPerShowroom.findMany({
      where: {
        productId: id,
        quantity: { gt: 0 },
        mitra: { status: "ACTIVE" },
      },
      select: {
        id: true,
        quantity: true,
        variantId: true,
        mitra: {
          select: {
            id: true,
            showroomName: true,
            address: true,
            city: true,
            latitude: true,
            longitude: true,
            logoUrl: true,
          },
        },
      },
      orderBy: { mitra: { showroomName: "asc" } },
    });

    return ok(stocks);
  } catch (e) {
    console.error("[GET /api/item/[id]/availability]", e);
    return err("Failed to fetch availability", 500);
  }
}
