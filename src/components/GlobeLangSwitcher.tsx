"use client";

import { useState, useTransition } from "react";
import { useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { RiGlobalLine } from "@remixicon/react"; 
import { useParams } from "next/navigation";

export default function LocaleSwitcher() {
  const t = useTranslations("LocaleSwitcher");
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [isPending, startTransition] = useTransition();

  // Controls opening/closing the dropdown
  const [isOpen, setIsOpen] = useState(false);

  // When the user picks a locale
  function handleLocaleChange(nextLocale: string) {
    startTransition(() => {
      router.replace(
        // Same logic as before:
        // We'll pass the current route (pathname, params)
        // and just change the locale
        {
          pathname,
          params
        },
        { locale: nextLocale }
      );
    });
    setIsOpen(false);
  }

  return (
    <div className="relative inline-block text-left">
      {/* Button that toggles the dropdown */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        disabled={isPending}
        className="p-2 hover:opacity-80 transition-opacity"
      >
        <RiGlobalLine className="text-xl" />
      </button>

      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-md shadow-lg z-50"
          onClick={() => setIsOpen(false)} // optional: close dropdown on any click
        >
          <ul className="py-1">
            {routing.locales.map((cur) => (
              <li key={cur}>
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // so it doesn't close prematurely
                    handleLocaleChange(cur);
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  {t("locale", { locale: cur })}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
