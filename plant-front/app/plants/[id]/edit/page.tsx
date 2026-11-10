import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { getMyPlant } from "@/lib/api";
import MyPlantEditForm from "@/components/myplants/MyPlantEditForm";

type Params = { params: Promise<{ id: string }> };

export default async function EditMyPlantPage({ params }: Params) {
  const { id } = await params;
  const cookieStore = await cookies();
  const cookie = cookieStore.toString();
  const plant = await getMyPlant(Number(id), cookie);

  if (!plant) {
    if (!cookie) redirect("/login");
    notFound();
  }

  return (
    <main className="mx-auto max-w-xl p-6">
      <h1 className="text-2xl font-bold">{plant.nickname} 수정</h1>
      <MyPlantEditForm plant={plant} />
    </main>
  );
}
