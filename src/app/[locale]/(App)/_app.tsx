import { ProductStoreProvider } from "@/app/(store)/provider";

function MyApp({ Component, pageProps }) {
  return (
    <ProductStoreProvider>
      <Component {...pageProps} />
    </ProductStoreProvider>
  );
}

export default MyApp;
