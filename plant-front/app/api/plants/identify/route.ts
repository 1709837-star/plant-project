import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const formData = await req.formData(); // 모달에서 보낸 사진 받기
  const cookie = req.headers.get("cookie") ?? ""; // 로그인 세션 필요

  const res = await fetch("http://127.0.0.1:8080/api/plants/identify", {
    method: "POST",
    headers: { cookie },
    body: formData,
  })
  // forward()는 Content-Type을 application/json으로 고정하고 body를 JSON.stringfy로 바꿔버림
  // 그러면 파일이 깨져서 FastAPI가 못 받는다
  // 그래서 forward() 안 쓰고 직접 fetch로 보냄
  
  const data = await res.json(); // 스프링이 준 결과를 받음
  return NextResponse.json(data, { status: res.status }); // 결과를 모달에 그대로 돌려줌
}
