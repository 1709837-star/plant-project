/* 로그인 중계 */

import { forward } from "@/lib/forward";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json(); // 브라우저가 보낸 { email, password }를 꺼내
  return forward("/api/auth/login", "POST", body); // forward를 통해 그대로 스프링에 넘겨줌
}

// 스프링이 로그인 성공하면 Set-Cookie: JSESSIONID=...를 주는데, 
// 그걸 브라우저에 그대로 넘겨줌
// 실패하면 스프링이 준 상태 코드를 그대로 돌려줌
