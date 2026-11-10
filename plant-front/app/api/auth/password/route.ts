import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { forward } from "@/lib/forward";

export async function PUT(req: NextRequest) {
  const cookie = (await cookies()).toString();
  const body = await req.json();
  return forward("/api/auth/password", "PUT", body, cookie);
}
