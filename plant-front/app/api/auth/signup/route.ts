/* 회원가입 중계 */
import { forward } from "@/lib/forward";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  return forward("/api/auth/signup", "POST", body);
}
