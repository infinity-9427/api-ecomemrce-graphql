"use client";

import { useEffect, useMemo } from "react";
import Cookies from "js-cookie";
import { useSearchParams, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useProductStore } from "@/app/(store)/provider";
import Image from "next/image";
import { Button } from "@/components/ui/button";

function Page() {
  const t = useTranslations("Search");
  const searchParams = useSearchParams();
  const router = useRouter();
  const queryParam = searchParams.get("query")?.toLowerCase() || "";
  const products = useProductStore((state) => state.products);

  // Guardar y recuperar la última búsqueda con cookies
  useEffect(() => {
    const savedQuery = Cookies.get("searchQuery");

    if (!queryParam && savedQuery) {
      router.replace(`/search?query=${encodeURIComponent(savedQuery)}`);
    } else {
      Cookies.set("searchQuery", queryParam);
    }
  }, [queryParam, router]);

  // Filtrar productos basados en el parámetro de búsqueda
  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.title.toLowerCase().includes(queryParam) ||
      product.description.toLowerCase().includes(queryParam) ||
      product.category.toLowerCase().includes(queryParam)
    );
  }, [queryParam, products]);

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-4">
        {queryParam ? `${t("results")} "${queryParam}"` : t("noResults")}
      </h1>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <div
              key={product.code}
              className="border rounded-lg overflow-hidden shadow-md flex flex-col"
            >
              <div className="relative w-full h-56">
                <Image
                  src={product.image}
                  alt={product.title}
                  layout="fill"
                  objectFit="cover"
                  className="max-h-56 w-full"
                />
              </div>
              <div className="p-4 flex flex-col flex-grow">
                <h2 className="text-lg font-semibold mb-2">{product.title}</h2>
                <p className="text-sm text-gray-600 mb-2 flex-grow">
                  {product.description}
                </p>
                <p className="font-bold text-blue-600 mb-2">
                  ${product.price.toFixed(2)}
                </p>
                <Button className="w-full mt-auto">Add to Cart</Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">{t("noResults")}</p>
      )}
    </div>
  );
}

export default Page;
