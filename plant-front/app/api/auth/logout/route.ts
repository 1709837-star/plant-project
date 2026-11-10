import { cookies } from "next/headers";
import { forward } from "@/lib/forward";

export async function POST() {
  const cookie = (await cookies()).toString();
  return forward("/api/auth/logout", "POST", undefined, cookie);
}
