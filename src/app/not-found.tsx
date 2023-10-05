import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404",
  description: "Страница не найдена",
};

export default function NotFound() {
  return (
    <div className="text-center my-10">
      <h1 className="text-xl">404 ошибка</h1>
      <p>То, что вы запросили, не существует.</p>

      <div className="mt-8">
        <Link href="/">Вернуться на главную</Link>
      </div>
    </div>
  );
}
