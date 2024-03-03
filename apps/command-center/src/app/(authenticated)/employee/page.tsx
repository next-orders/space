import { Breadcrumbs } from "@/components/Breadcrumbs";
import { getDictionary } from "@/dictionaries";
import { getLocale } from "@/client/locale";

export default async function Page() {
  const locale = getLocale();

  const { EMPLOYEE_BASE_LABEL } = getDictionary(locale);

  return (
    <>
      <Breadcrumbs keys={["EMPLOYEE_BASE"]} />

      <h1 className="mb-2 text-3xl font-semibold">{EMPLOYEE_BASE_LABEL}</h1>

      <div>[In development]</div>
    </>
  );
}
