import "@/styles/globals.css";

import type { AppProps } from "next/app";

import { RainbowKitWrapper } from "@/components/wallet/RainbowKitWrapper";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RainbowKitWrapper>
      <Component {...pageProps} />
    </RainbowKitWrapper>
  );
}
