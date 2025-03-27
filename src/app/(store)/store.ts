import { createStore } from "zustand/vanilla";
import Cookies from "js-cookie";
import { products } from "@/utils/Dummy";

export type Product = {
  code: string;
  title: string;
  description: string;
  price: number;
  category: string;
  image: string;
};

export type ProductState = {
  products: Product[];
  cart: Product[];
};

export type ProductActions = {
  addToCart: (product: Product) => void;
  removeFromCart: (code: string) => void;
  clearCart: () => void;
};

export type ProductStore = ProductState & ProductActions;

export const initProductStore = (): ProductState => {
  const savedCart = Cookies.get("cart");
  return {
    products,
    cart: savedCart ? JSON.parse(savedCart) : [],
  };
};

export const createProductStore = (
  initState: ProductState = initProductStore()
) => {
  return createStore<ProductStore>()((set) => ({
    ...initState,
    addToCart: (product) =>
      set((state) => {
        const updatedCart = [...state.cart, product];
        Cookies.set("cart", JSON.stringify(updatedCart), { expires: 7 });
        return { cart: updatedCart };
      }),
    removeFromCart: (code) =>
      set((state) => {
        const updatedCart = state.cart.filter((p) => p.code !== code);
        Cookies.set("cart", JSON.stringify(updatedCart), { expires: 7 });
        return { cart: updatedCart };
      }),
    clearCart: () =>
      set(() => {
        Cookies.remove("cart");
        return { cart: [] };
      }),
  }));
};
