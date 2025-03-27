import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import '../../global.css';
import { Toaster } from "react-hot-toast";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = await Promise.resolve(params);
  const messages = await getMessages({ locale });

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Toaster position="top-right" />
          <div className="flex h-screen bg-[#FFF] text-[#333333] overflow-hidden">
            <div className="flex-1 overflow-auto relative z-10">{children}</div>
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
