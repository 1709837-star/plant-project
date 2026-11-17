/* << 도감 페이지 검색창 >> */

// "use client" 없는 평범한 HTML<form>
// 검색어를 주소로 보내는 애
export default function SpeciesSearchBar({
  keyword,
  light,
}: {
  keyword?: string;
  light?: string;   // 
}) {
  return (
    <form className="mt-4 flex flex-wrap gap-2">
      <input
        name="keyword"
        defaultValue={keyword ?? ""}
        placeholder="이름 검색"
        className="min-w-0 flex-1 rounded-full border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm outline-none focus:border-green-700"
      />  
      <select name="light" defaultValue={light ?? ""} className="rounded-full border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm outline-none focus:border-green-700">
        <option value="">광도 전체</option>
        <option value="LOW">낮은 광도</option>
        <option value="MEDIUM">중간 광도</option>
        <option value="HIGH">높은 광도</option>
      </select>
      <button className="rounded-full bg-green-500 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-700">검색</button>
    </form>
  );
}

// (1) 검색 버튼을 누르면, 자바스크립트 없이 브라우저가 알아서 주소를 바꿈
// (2) /species?keyword=몬스테라&light=medium
// (3) 페이지가 그 주소를 보고 getSpecies()를 불러서 스프링에서 목록을 가져옴
// (4) 새 목록을 SpeciesList에 넘겨줌
