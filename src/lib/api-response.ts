import { NextResponse } from "next/server";
import type { ApiResponse } from "@/types";

export function ok<T>(data: T, status = 200): NextResponse<ApiResponse<T>> {
  return NextResponse.json({ data, error: null }, { status });
}

export function err(message: string, status = 400): NextResponse<ApiResponse<null>> {
  return NextResponse.json({ data: null, error: message }, { status });
}

export function paginated<T>(
  data: T[],
  total: number,
  page: number,
  perPage: number,
): NextResponse<ApiResponse<T[]>> {
  return NextResponse.json({ data, error: null, meta: { page, perPage, total } });
}
