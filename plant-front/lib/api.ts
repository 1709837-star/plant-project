/* << 조회 전용 다리 >> */
// 서버 컴포넌트에서 부르는 거라 브라우저가 스프링에 직접 가는 게 아님
export const API_BASE = process.env.PLANT_API ?? "http://127.0.0.1:8080";

// 타입 4개 - 설계도
export type Species = {
  id: number;
  name: string;
  category: string | null;
  growthForm: string | null;
  growthHeight: string | null;
  growthWidth: string | null;
  placement: string | null;
  optimalTemp: string | null;
  humidity: string | null;
  lightLevel: string | null;
  difficulty: string | null;
  minWinterTemp: number | null;
  waterNote: string | null;
  waterSpringImg: string | null;
  waterSummerImg: string | null;
  waterAutumnImg: string | null;
  waterWinterImg: string | null;
  waterSpringNote: string | null;
  waterSummerNote: string | null;
  waterAutumnNote: string | null;
  waterWinterNote: string | null;
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

export type WateringLog = {
  id: number;
  wateredDate: string;
  memo: string | null;
};

/* ★ 조회 함수 6개 - 읽기 전용 다리 */
/* 전부 cache: "no-store", 매번 새로 가져오겠다. */
/* async함수라서 뒤에 Promise(나중에 줄게) 약속이 붙음 */
/* fetch는 Next 서버가 대신 스프링을 불러서 컨트롤러에 바로 닿음 */

// 도감 목록
export async function getSpecies(params?: {
  keyword?: string;
  light?: string;
  difficulty?: string;
  page?: number;
  size?: number;
}): Promise<Page<Species>> {
  const query = new URLSearchParams();
  if (params?.keyword) query.set("keyword", params.keyword);
  if (params?.light) query.set("light", params.light);
  if (params?.difficulty) query.set("difficulty", params.difficulty);
  if (params?.page != null) query.set("page", String(params.page));
  if (params?.size != null) query.set("size", String(params.size));
  // 조건이 여러 개면 params, 조건이 id 하나면 인자

  const res = await fetch(`${API_BASE}/api/species?${query.toString()}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("도감을 불러오지 못했습니다");
  return res.json();
}

// 도감 상세
export async function getSpeciesById(id: number): Promise<Species | null> {
  const res = await fetch(`${API_BASE}/api/species/${id}`, { cache: "no-store" });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error("도감을 불러오지 못했습니다");
  return res.json();
}

// 내 식물 목록
export async function getMyPlants(cookie?: string): Promise<MyPlant[] | null> {
  const res = await fetch(`${API_BASE}/api/my-plants?sort=due`, {
    headers: cookie ? { Cookie: cookie } : {}, // "누구야? (로그인이 필요한 애들한테만)"
    cache: "no-store",  // "매번 새로 가져와 (캐시 안 씀)"
  });
  if (res.status === 401 || res.status === 403) return null; // 로그인 안 됨
  if (!res.ok) throw new Error("내 식물을 불러오지 못했습니다");
  return res.json();
}

// 내 식물 상세
export async function getMyPlant(id: number, cookie?: string): Promise<MyPlant | null> {
  const res = await fetch(`${API_BASE}/api/my-plants/${id}`, {
    headers: cookie ? { Cookie: cookie } : {},
    cache: "no-store",
  });
  if (res.status === 401 || res.status === 403 || res.status === 404) return null;
  if (!res.ok) throw new Error("내 식물 상세를 불러오지 못했습니다");
  return res.json();
}

// 물주기 기록
export async function getWaterings(id: number, cookie?: string): Promise<WateringLog[]> {
  const res = await fetch(`${API_BASE}/api/my-plants/${id}/waterings`, {
    headers: cookie ? { Cookie: cookie } : {},
    cache: "no-store",
  });
  if (!res.ok) return []; // 실패하면 빈 배열 주기
  return res.json();
}

// 로그인한 사람이 누군지
export async function getMe(cookie?: string) {
  const res = await fetch(`${API_BASE}/api/auth/me`, {
    headers: cookie ? { Cookie: cookie } : {},
    cache: "no-store",
  });
  if (!res.ok) return null;
  return res.json();
}