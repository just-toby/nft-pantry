import "@/styles/globals.css";

import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";

import { RainbowKitWrapper } from "@/components/wallet/RainbowKitWrapper";
import { GraphQLProvider } from "@/graphql/GraphQLContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RainbowKitWrapper>
      <GraphQLProvider>
        <Component {...pageProps} />
        <Toaster
          toastOptions={{
            success: {
              style: {
                background: "green",
                color: "white",
              },
            },
            error: {
              style: {
                background: "red",
                color: "white",
              },
            },
          }}
        />
      </GraphQLProvider>
    </RainbowKitWrapper>
  );
}
