import "@rainbow-me/rainbowkit/styles.css";

import { Inter } from "@next/font/google";
import Head from "next/head";

import { Header } from "@/components/header/Header";
import styles from "@/styles/Home.module.css";
import { tw } from "@/util/tailwind";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>NFT Pantry: Social Feed</title>
        <meta name="description" content="View recent NFT trades" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={tw(styles.main, "text-white")}>
        <Header />

        {/* feed */}
        {/* todo */}
      </main>
    </>
  );
}
