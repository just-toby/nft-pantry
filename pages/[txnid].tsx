import "@rainbow-me/rainbowkit/styles.css";

import Head from "next/head";
import { useRouter } from "next/router";
import useSWR from "swr";

import { CommentInput } from "@/components/comments/CommentInput";
import { CommentList } from "@/components/comments/CommentList";
import { NftTradeCard } from "@/components/feed/NftTradeCard";
import { Header } from "@/components/header/Header";
import { useGraphQLClientSdk } from "@/graphql/GraphQLContext";
import styles from "@/styles/Home.module.css";
import { tw } from "@/util/tailwind";

export default function Home() {
  const router = useRouter();
  const { txnid } = router.query;
  const sdk = useGraphQLClientSdk();

  const { data: transaction } = useSWR(
    "TransactionDetails" + txnid,
    async () => {
      const result = await sdk?.FeedQuery({
        transactionHash: txnid as string,
      });
      return result?.data?.feed?.[0];
    }
  );

  return (
    <>
      <Head>
        <title>NFT Pantry: Social Feed</title>
        <meta name="description" content="View recent NFT trades" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={tw(styles.main, "text-primary")}>
        <Header />

        <div className="my-20 px-20 max-w-xl flex flex-col items-center">
          {transaction && (
            <>
              <NftTradeCard trade={transaction} />
              <div className="mt-10 flex flex-col items-center w-full">
                <CommentList />
                <CommentInput transactionHash={transaction?.transactionHash} />
              </div>
            </>
          )}
        </div>
      </main>
    </>
  );
}
