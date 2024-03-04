import { GetMenuCategoryById } from '../../../../client/api';
import { Breadcrumbs } from '../../../../components/Breadcrumbs';
import { getLocale } from '../../../../client/locale';
import { CategoryEditModal } from './CategoryEditModal';

type PageProps = {
  params: { id: string };
};

export default async function Page({ params }: PageProps) {
  const locale = getLocale();
  const category = await GetMenuCategoryById(params.id);

  return (
    <>
      <Breadcrumbs keys={['MENU_CATEGORY_PAGE']} />

      <h1 className="mb-2 text-3xl font-semibold">Menu Category Page</h1>
      <div>You can see the loaded data</div>

      <CategoryEditModal locale={locale} category={category} isOpened={true} />
    </>
  );
}
