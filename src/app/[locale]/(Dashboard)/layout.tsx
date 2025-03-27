
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import "../../global.css";
import {Toaster} from 'react-hot-toast';

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: {locale: string};
}) {
  // Await the params object
  const {locale} = await Promise.resolve(params);
  const messages = await getMessages({locale});

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Toaster position="top-right" />
          <div className="flex h-screen bg-[#FFF] text-[#333333] overflow-hidden">
            <Sidebar />
            <div className="flex-1 overflow-auto relative z-10">
              {/* Header uses the 'title' from context */}
              <Header />
              {children}
            </div>
          </div>
          </NextIntlClientProvider>
      </body>
    </html>
  );
}
