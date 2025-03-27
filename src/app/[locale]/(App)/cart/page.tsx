"use client";
import { useProductStore } from "@/app/(store)/provider";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Image from "next/image";

const CartPage = () => {
  const cart = useProductStore((state) => state.cart);
  const removeFromCart = useProductStore((state) => state.removeFromCart);
  const [cartItems, setCartItems] = useState([]);
  const t = useTranslations("Cart")

  // 🔍 Agrupar productos duplicados
  const groupCartItems = (items) => {
    const grouped = items.reduce((acc, item) => {
      if (acc[item.code]) {
        acc[item.code].quantity += 1;
      } else {
        acc[item.code] = { ...item, quantity: 1 };
      }
      return acc;
    }, {});
    return Object.values(grouped);
  };

  useEffect(() => {
    const savedCart = Cookies.get("cart");
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setCartItems(groupCartItems(parsedCart));
      } catch (error) {
        console.error("❌ Error al parsear cookies:", error);
      }
    }
  }, [cart]);

  // ✅ Calcular total correctamente
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4"> { t("yourCart") } </h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-600">{t("noItems")}</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div key={item.code} className="flex justify-between items-center border p-4 rounded-lg shadow-sm">
              <div className="flex items-center space-x-4">
                <Image src={item.image} alt={item.title} width={150} height={100}  className="object-cover rounded" priority />
                <div>
                  <h2 className="text-lg font-semibold">{item.title}</h2>
                  <p className="text-gray-800 font-bold">${item.price.toFixed(2)} x {item.quantity}</p>
                  <p className="text-gray-600">Subtotal: ${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
              <Button variant="destructive" onClick={() => removeFromCart(item.code)}>
              { t("deleteButton") }
              </Button>
            </div>
          ))}

          <div className="flex justify-between items-center border-t pt-4 mt-4">
            <h2 className="text-xl font-bold">{ t("total") }:</h2>
            <p className="text-xl font-bold">${totalPrice.toFixed(2)}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
