import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getMe } from "@/lib/api";
import ChangePasswordForm from "@/components/mypage/ChangePasswordForm";
import BackButton from "@/components/common/BackButton";

export default async function PasswordPage() {
  const cookie = (await cookies()).toString();
  const me = await getMe(cookie);
  if (!me) redirect("/login");

  return (
    <main className="mx-auto max-w-md p-4">
      <BackButton label="← 마이페이지로" />
      <h1 className="mt-4 text-xl font-bold">비밀번호 변경</h1>
      <ChangePasswordForm />
    </main>
  );
}
