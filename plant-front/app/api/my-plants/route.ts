import { forward } from "@/lib/forward";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const cookie = request.headers.get("cookie") ?? undefined;
  return forward("/api/my-plants", "POST", body, cookie);
}
