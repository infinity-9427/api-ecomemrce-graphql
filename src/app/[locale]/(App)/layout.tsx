// import {routing, Locale} from '@/i18n/routing';
// import { NextIntlClientProvider} from 'next-intl';
// import {getMessages} from 'next-intl/server';
// import {notFound} from 'next/navigation';
// import '../../global.css';
// import { ClerkProvider } from '@clerk/nextjs';
// import { ProductStoreProvider } from '@/app/(store)/provider';
// import Header from '@/components/Header';
// import Footer from '@/components/Footer';


// type LocaleLayoutProps = {
//   children: React.ReactNode;
//   params: Promise<{locale: string}>;
// };


// export default async function RootLayout({
//   children,
//   params
// }: Readonly<LocaleLayoutProps>) {
//   const resolvedParams = await params;
//   const {locale} = resolvedParams;

//   if (!routing.locales.includes(locale as Locale)) {
//     notFound();
//   }

//   const messages = await getMessages();

//   return (
//     <ClerkProvider dynamic>
//       <html lang={locale} suppressHydrationWarning>
//         <body className="flex flex-col min-h-screen">
//           <NextIntlClientProvider messages={messages}>
//             <ProductStoreProvider>
//               <Header />
//               <main className="flex-1">{children}</main>
//             </ProductStoreProvider>
//             <Footer />
//           </NextIntlClientProvider>
//         </body>
//       </html>
//     </ClerkProvider>
//   );
// }


import { routing, Locale } from '@/i18n/routing';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import '../../global.css';
import { ClerkProvider } from '@clerk/nextjs';
import { ProductStoreProvider } from '@/app/(store)/provider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { cookies } from 'next/headers'; // Import cookies

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function RootLayout({
  children,
  params,
}: Readonly<LocaleLayoutProps>) {
  const resolvedParams = await params;
  const { locale: urlLocale } = resolvedParams;

  // Get the locale from the cookie, if it exists
  const cookieLocale = cookies().get('NEXT_LOCALE')?.value;

  // Use the cookie locale if it's valid, otherwise fall back to the URL locale
  const locale = cookieLocale && routing.locales.includes(cookieLocale as Locale)
    ? cookieLocale
    : urlLocale;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = await getMessages({ locale }); // Pass locale to getMessages

  return (
    <ClerkProvider dynamic>
      <html lang={locale} suppressHydrationWarning>
        <body className="flex flex-col min-h-screen">
          <NextIntlClientProvider messages={messages} locale={locale}>
            <ProductStoreProvider>
              <Header />
              <main className="flex-1">{children}</main>
            </ProductStoreProvider>
            <Footer />
          </NextIntlClientProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}