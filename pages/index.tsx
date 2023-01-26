import "@rainbow-me/rainbowkit/styles.css";

import Head from "next/head";

import { Feed } from "@/components/feed/Feed";
import { Header } from "@/components/header/Header";
import styles from "@/styles/Home.module.css";
import { tw } from "@/util/tailwind";

export default function Home() {
  return (
    <>
      <Head>
        <title>NFT Pantry: Social Feed</title>
        <meta name="description" content="View recent NFT trades" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={tw(styles.main, "text-white p-4 mt-16")}>
        <Header />
        <Feed />
      </main>
    </>
  );
}
