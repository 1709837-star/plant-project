import { cookies } from "next/headers";
import { forward } from "@/lib/forward";

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ wateringId: string }> }
) {
  const { wateringId } = await params;
  const cookieStore = await cookies();
  return forward(`/api/my-plants/waterings/${wateringId}`, "DELETE", undefined, cookieStore.toString());
}
