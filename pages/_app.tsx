import "@/styles/globals.css";

import type { AppProps } from "next/app";

import { RainbowKitWrapper } from "@/components/wallet/RainbowKitWrapper";
import { GraphQLProvider } from "@/graphql/GraphQLContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RainbowKitWrapper>
      <GraphQLProvider>
        <Component {...pageProps} />
      </GraphQLProvider>
    </RainbowKitWrapper>
  );
}
