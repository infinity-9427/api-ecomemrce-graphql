"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useProductStore } from "@/app/(store)/provider";
import { useTranslations } from "next-intl";

const HomePage = () => {
  const products = useProductStore((state) => state.products);
  const addToCart = useProductStore((state) => state.addToCart);

  const t = useTranslations("Home")
  return (
    <div className="p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
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
              <Button
                className="w-full mt-auto"
                onClick={() => addToCart(product)}
              >
                {t("addToCart")}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
