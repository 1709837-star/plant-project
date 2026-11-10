/* 조회 전용 다리 */
// 서버 컴포넌트에서 부르는 거라 브라우저가 스프링에 직접 가는 게 아님
export const API_BASE = process.env.PLANT_API ?? "http://127.0.0.1:8080";

export type Species = {
  id: number;
  name: string;
  scientificName: string | null;
  lightLevel: string | null;
  difficulty: string | null;
  minWinterTemp: number | null;
  waterSpringDays: number | null;
  waterSummerDays: number | null;
  waterAutumnDays: number | null;
  waterWinterDays: number | null;
  wateringIntervalDays: number | null;
  waterNote: string | null;
  sourceUrl: string | null;
  imageUrl: string | null;
};

export type MyPlant = {
  id: number;
  speciesId: number | null;
  speciesName: string | null;
  nickname: string;
  location: string | null;
  wateringIntervalDays: number | null;
  effectiveIntervalDays: number | null;
  lastWateredDate: string;
  nextWateringDate: string | null;
  dDay: number | null;
  adoptedDate: string | null;
  memo: string | null;
  photoUrl: string | null;
};

export type Page<T> = {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
};

export async function getSpecies(params?: {
  keyword?: string;
  light?: string;
  difficulty?: string;
}): Promise<Page<Species>> {
  const query = new URLSearchParams();
  if (params?.keyword) query.set("keyword", params.keyword);
  if (params?.light) query.set("light", params.light);
  if (params?.difficulty) query.set("difficulty", params.difficulty);

  const res = await fetch(`${API_BASE}/api/species?${query.toString()}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("도감을 불러오지 못했습니다");
  return res.json();
}

export async function getSpeciesById(id: number): Promise<Species | null> {
  const res = await fetch(`${API_BASE}/api/species/${id}`, { cache: "no-store" });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error("도감을 불러오지 못했습니다");
  return res.json();
}
