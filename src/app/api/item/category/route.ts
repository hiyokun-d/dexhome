import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

/* api/item/category?type=halo */
export async function GET(_req: NextRequest) {
  const categoryReq = await _req.nextUrl.searchParams;
  const category = categoryReq.get("type");

  if (!category) {
    NextResponse.json(
      { error: "YOU SHOULD IMPLEMENT THE CATEGORY! check the docs pls" },
      { status: 500 },
    );
  }

  const findCategory = await prisma.product.findUnique({
    where: { category },
  });

  if (!findCategory) {
    NextResponse.json(
      { error: "the category that you try to find is not found!" },
      { status: 404 },
    );
  }

  return NextResponse.json(findCategory);
}
