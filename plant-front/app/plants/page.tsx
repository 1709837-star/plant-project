/* 내 식물 목록 (서버 컴포넌트, D-day순) */

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getMyPlants } from "@/lib/api";
import MyPlantList from "@/components/myplants/MyPlantList";

type Props = {
  searchParams: Promise<{ sort?: string }>;
  // searchParams: Next가 주소창에서 넣어주는 것. /plants?sort=latest로 들어오면 params.sort는 "latest"가 됨
};

export default async function MyPlantsPage({ searchParams }: Props) {
  const params = await searchParams;
  const sort = params.sort ?? "due";
  const cookieStore = await cookies();
  const plants = await getMyPlants(cookieStore.toString(), sort);
  // 스프링에 "내(cookie) 식물 목록 줘." 물어보면 ?sort=due로 D-day 임박순으로 옴

  // 로그인 안 했으면 로그인 페이지로 보내
  if (plants === null) redirect("/login");
    
  return (
      <main className="mx-auto max-w-2xl p-4">
        <div className="flex items-center justify-between gap-3">
          <h1 className="text-2xl font-bold">나의 정원</h1>
          <form className="mt-3 flex gap-2">
            <select
              name="sort"
              defaultValue={sort}
              className="rounded-full border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm outline-none"
            >
              <option value="due">D-day 임박순</option>
              <option value="latest">최신 등록순</option>
              <option value="oldest">과거 등록순</option>
            </select>
            <button className="rounded-full bg-green-500 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-600">
              정렬
            </button>
          </form>
        </div>
        <div className="mt-4">
          <MyPlantList plants={plants} />  {/* 스프링에서 받아온 목록을 자식한테 넘겨줌 */}
        </div>
      </main>
    );
  }