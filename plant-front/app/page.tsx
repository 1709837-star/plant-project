import Image from "next/image";
import Link from "next/link";


export default function Home() {
  return (

    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      
    <Link href="/species" className="text-green-700 underline">
      식물 도감 보러 가기 →
    </Link>
      
    </div>
  );
}
