/* 중계 공통 함수 */
// 블로그 때 거에 쿠키만 추가
import { API_BASE } from "./api";

export async function forward(
  path: string,
  method: string,
  body?: unknown,
  cookie?: string
) {
  let response: Response;
  try {
    response = await fetch(`${API_BASE}${path}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(cookie ? { Cookie: cookie } : {}),
      },
      body: body === undefined ? undefined : JSON.stringify(body),
      cache: "no-store",
    });
  } catch {
    return new Response(JSON.stringify({ message: "백엔드에 연결할 수 없습니다" }), {
      status: 502,
      headers: { "Content-Type": "application/json" },
    });
  }

  const text = await response.text();
  // 스프링이 준 Set-Cookie(JSESSIONID)를 브라우저에 그대로 넘겨줘
  const setCookie = response.headers.get("set-cookie");
  return new Response(text, {
    status: response.status,
    headers: {
      "Content-Type": "application/json",
      ...(setCookie ? { "set-cookie": setCookie } : {}),
    },
  });
}
