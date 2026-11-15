import { cookies } from "next/headers";
import { forward } from "@/lib/forward";

export async function POST() {
  const cookie = (await cookies()).toString();
  return forward("/api/auth/logout", "POST", undefined, cookie); // 스프링 /api/auth/logout에 POST를 보냄
}
