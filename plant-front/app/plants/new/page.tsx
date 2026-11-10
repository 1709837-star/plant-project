/* 서버 컴포넌트 */
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getMe, getSpecies } from "@/lib/api";
import MyPlantForm from "@/components/myplants/MyPlantForm";

type SearchParams = { searchParams: Promise<{ speciesId?: string }> };

export default async function NewMyPlantPage({ searchParams }: SearchParams) {
  // 폼 보여주기 전에 로그인부터 확인해. 안 돼 있으면 /login으로 보내
  const cookie = (await cookies()).toString();
  const me = await getMe(cookie);
  if (!me) {
    redirect("/login");
  }

  const { speciesId } = await searchParams;
  const page = await getSpecies({ page: 0, size: 200 });
  const speciesList = page?.content ?? [];

  return (
    <main className="mx-auto max-w-xl p-6">
      <h1 className="text-2xl font-bold">내 식물 등록</h1>
      <MyPlantForm
        speciesList={speciesList}
        initialSpeciesId={speciesId ? Number(speciesId) : undefined}
      />
    </main>
  );
}
