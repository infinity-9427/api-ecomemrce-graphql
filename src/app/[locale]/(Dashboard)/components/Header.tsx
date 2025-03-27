'use client';
import { usePathname } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';

const Header = () => {
  const pathname = usePathname();
  const locale = useLocale();
  const pathWithoutLocale = pathname.replace(`/${locale}`, '');
  const t = useTranslations('Dashboard');

  return (
    <header className="bg-transparent shadow-sm border-b border-[#E0E0E0] ">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        {/* <h1 className="text-2xl font-semibold ">{t(`Section.${pathWithoutLocale}`)}</h1> */}
        <h1>section</h1>
      </div>
    </header>
  );
};

export default Header;
