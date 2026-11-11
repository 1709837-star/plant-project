export default function DDayBadge({ dDay }: { dDay: number | null }) {
  const d = dDay ?? 0;
  const color =
    d <= 0
      ? "bg-red-100 text-red-700"
      : d <= 3
        ? "bg-yellow-100 text-yellow-700"
        : "bg-green-100 text-green-700";
  return (
    <span className={`rounded px-2 py-1 text-sm font-semibold ${color}`}>
      D{d > 0 ? `-${d}` : `+${-d}`}
    </span>
  );
}
