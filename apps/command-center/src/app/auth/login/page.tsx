import Image from 'next/image';
import { LoginForm } from '../../../components/LoginForm';
import { GetDemoSignInData } from '../../../client/api';
import { getDictionary } from '../../../dictionaries';
import { getLocale } from '../../../client/locale';
import StaticEggs from '../../../../public/static/eggs.png';

export default async function Page() {
  const demoData = await GetDemoSignInData();
  const locale = getLocale();

  const { SIGNIN_PAGE_WELCOME_LABEL } = getDictionary(locale);

  return (
    <div className="w-full h-screen mx-auto flex flex-row justify-center items-center">
      <div>
        <Image
          src={StaticEggs}
          width={StaticEggs.width}
          height={StaticEggs.height}
          alt=""
          className="mx-auto mb-2 w-16 h-16"
        />

        <h1 className="mb-10 text-2xl text-center">
          {SIGNIN_PAGE_WELCOME_LABEL}
        </h1>

        <LoginForm demo={demoData} locale={locale} />
      </div>
    </div>
  );
}
