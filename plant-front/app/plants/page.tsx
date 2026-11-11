/* 내 식물 목록 (서버 컴포넌트, D-day순) */

import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getMyPlants } from "@/lib/api";
import MyPlantList from "@/components/myplants/MyPlantList";

import WaterButton from "@/components/myplants/WaterButton";

export default async function MyPlantsPage() {
  const cookieStore = await cookies();
  const plants = await getMyPlants(cookieStore.toString());

  // 로그인 안 했으면 로그인 페이지로 보내
  if (plants === null) redirect("/login");
    
  return (
    <main className="mx-auto max-w-2xl p-4">
      <h1 className="text-2xl font-bold">나의 정원</h1>
      <p className="mt-1 text-sm text-gray-500">D-day 임박순</p>
      <div className="mt-4">
        <MyPlantList plants={plants} />
      </div>
    </main>
  );
}
