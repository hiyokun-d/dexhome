import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const items = await prisma.product.findMany({
    include: {
      mitra: { select: { showroomName: true } },
      category: { select: { name: true, icon: true } },
      images: { orderBy: { order: "asc" } },
      reviews: { select: { rating: true } },
    },
  });

  const data = items.map(({ reviews, ...item }) => ({
    ...item,
    avgRating: reviews.length
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : null,
    reviewCount: reviews.length,
  }));

  return NextResponse.json(data);
}
