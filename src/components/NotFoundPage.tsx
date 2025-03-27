import { useTranslations } from 'next-intl';
import PageLayout from './PageLayout';

export default function NotFoundPage() {
  const t = useTranslations('NotFoundPage');

  return (
    <PageLayout title={t('title')}>
      <div className='w-full' >

      <p className="mt-2  text-center  text-gray-400 md:text-lg lg:text-2xl xl:text-2xl ">
        {t('description')}
      </p>

      </div>
  
    </PageLayout>
  );
}
