import "@rainbow-me/rainbowkit/styles.css";

import Head from "next/head";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { useNetwork, useWaitForTransaction } from "wagmi";

import { Header } from "@/components/header/Header";
import styles from "@/styles/Home.module.css";
import { filterNulls } from "@/util";
import { getTxHashWithPrefix } from "@/util/addresses";
import { ERC721TransferTopic } from "@/util/contractEvents";
import { useSigner } from 'wagmi'

type NFTTransfer = {
  from: string;
  to: string;
  tokenId: string;
  contractAddress: string;
};

export function CommentForm() {
  const [comment, setComment] = useState("")
  const { data: signer, isError, isLoading } = useSigner()
  const submitComment = async () => {
    console.log(comment);
    console.log(signer);

    const resp = await fetch('https://api.sampleapis.com/beers/ale');
    const json = await resp.json();
    console.log(json);
  }
  return (
    <div className="flex flex-col mt-16">
      <input className="bg-neutral-300" type="text" onChange={(e) => { setComment(e.target.value); }} />
      <button onClick={submitComment}>Submit Comment</button>
    </div>
  )
}

export default function Home() {
  const router = useRouter();
  const { txnid } = router.query;

  const { chain } = useNetwork();
  const { data, error } = useWaitForTransaction({
    chainId: chain?.id,
    hash: getTxHashWithPrefix(txnid as string),
  });

  const transfers: NFTTransfer[] = useMemo(() => {
    return filterNulls(
      data?.logs.map((log) => {
        if (log.topics[0] === ERC721TransferTopic && log.topics.length === 4) {
          const from = log.topics[1];
          const to = log.topics[2];
          const tokenId = log.topics[3];
          const contractAddress = log.address;
          return {
            from,
            to,
            tokenId,
            contractAddress,
          };
        }
        return null; // not an ERC721 transfer event
      }) ?? []
    );
  }, [data?.logs]);

  // if (error) {
  //   // todo: make an error state
  //   return <div>error</div>;
  // }

  return (
    <>
      <Head>
        <title>NFT Pantry: Social Feed</title>
        <meta name="description" content="View recent NFT trades" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Header />
        <CommentForm></CommentForm>
      </main>
    </>
  );
}
