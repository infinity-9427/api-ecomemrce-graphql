"use client";
import {
  ClerkLoaded,
  SignedIn,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import Link from "@/components/NavigationLink";
import {
  RiShoppingCart2Line as CartIcon,
  RiShoppingBagLine as BagIcon,
  RiCloseFill as CloseIcon,
} from "@remixicon/react";
import { Button } from "./ui/button";
import GlobeLangSwitcher from "./GlobeLangSwitcher";
import { useTranslations } from "next-intl";
import { Poppins } from "next/font/google";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "@/i18n/navigation";
import { useProductStore } from "@/app/(store)/provider";
import Form from "next/form";
import { useSearchParams } from "next/navigation";

const poppins = Poppins({ subsets: ["latin"], weight: ["600"] });

const Header = () => {
  const t = useTranslations("Header");
  const { user } = useUser();
  const [searchQuery, setSearchQuery] = useState("");
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const cart = useProductStore((state) => state.cart);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    setCartCount(cart.length);
  }, [cart]);

  useEffect(() => {
    const savedQuery = Cookies.get("searchQuery");
    if (savedQuery) setSearchQuery(savedQuery);
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchQuery(value);
    Cookies.set("searchQuery", value, { expires: 1 });
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    Cookies.remove("searchQuery");

    const newParams = new URLSearchParams(searchParams.toString());
    newParams.delete("query");
    replace(`${pathname}?${newParams.toString()}`, { scroll: false });
  };


  return (
    <header className="flex flex-wrap justify-between items-center px-4 py-3 bg-white sticky top-0 z-20 w-full shadow-md">
      <div className="flex w-full flex-wrap justify-between items-center">
        <Link
          href="/"
          className={`text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-500 text-transparent bg-clip-text cursor-pointer mx-auto sm:mx-0 ${poppins.className}`}
        >
          Entrophic Shop
        </Link>

        <Form
          action="/search"
          onSubmit={(e) => {
            if (!searchQuery.trim()) {
              e.preventDefault();
            }
          }}
          className="relative w-full sm:w-auto sm:flex-1 sm:mx-4 mt-2 sm:mt-0"
        >
          <div className="relative w-full max-w-3xl">
            <input
              type="text"
              name="query"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder={t("searchPlaceholder")}
              className="bg-gray-100 text-gray-800 px-4 py-2 pr-10 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 border w-full"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={handleClearSearch}
                className="absolute inset-y-0 right-4 flex items-center text-gray-400 hover:text-gray-600"
              >
                <CloseIcon className="cursor-pointer w-5 h-5" />
              </button>
            )}
          </div>
        </Form>

        <div className="w-full flex items-center space-x-4 mt-4 sm:mt-0 flex-1 justify-end">
          <div className="flex items-center space-x-4">
            <Link href="/cart" className="relative">
              <Button className="cursor-pointer flex items-center space-x-2">
                <CartIcon className="w-5 h-5" />
                <span className="font-bold">{t("cartButton")}</span>
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-sm font-bold w-6 h-6 flex items-center justify-center rounded-full">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>

            <ClerkLoaded>
              <SignedIn>
                <Link href="/orders">
                  <Button className="cursor-pointer flex items-center space-x-2 py-2 px-4">
                    <BagIcon className="w-5 h-5" />
                    <span className="font-bold">{t("orderButton")}</span>
                  </Button>
                </Link>
              </SignedIn>
              {user ? (
                <div className="flex items-center space-x-2">
                  <UserButton />
                  <div className="hidden sm:block text-xs">
                    <p className="text-black text-xs">{t("welcome")}</p>
                    <p className="font-bold">{user?.fullName}</p>
                  </div>
                </div>
              ) : (
                <SignInButton mode="modal">
                  <Button asChild className="font-bold">
                    <span>{t("signInButton")}</span>
                  </Button>
                </SignInButton>
              )}
            </ClerkLoaded>
          </div>
          <GlobeLangSwitcher />
        </div>
      </div>
    </header>
  );
};

export default Header;
