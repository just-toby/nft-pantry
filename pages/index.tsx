import "@rainbow-me/rainbowkit/styles.css";

import Head from "next/head";

import { Feed } from "@/components/feed/Feed";
import { Header } from "@/components/header/Header";

export default function Home() {
  return (
    <>
      <Head>
        <title>NFT Pantry: Social Feed</title>
        <meta name="description" content="View recent NFT trades" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={"text-black mt-24 bg-white flex flex-col items-center"}>
        <Header />
        <Feed />
      </main>
    </>
  );
}
