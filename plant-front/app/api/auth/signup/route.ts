/* 회원가입 중계 */
import { forward } from "@/lib/forward";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json(); // 브라우저가 보낸 { email, nickname, password }를 꺼내
  return forward("/api/auth/signup", "POST", body); // forward를 통해 그대로 스프링에 넘겨줌
}
