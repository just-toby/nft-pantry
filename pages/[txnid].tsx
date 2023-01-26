import "@rainbow-me/rainbowkit/styles.css";

import Head from "next/head";
import { useRouter } from "next/router";
import useSWR from "swr";

import { CommentInput } from "@/components/comments/CommentInput";
import { CommentList } from "@/components/comments/CommentList";
import { NftTradeCard } from "@/components/feed/NftTradeCard";
import { Header } from "@/components/header/Header";
import Rule from "@/components/Rule";
import { useGraphQLClientSdk } from "@/graphql/GraphQLContext";
import styles from "@/styles/Home.module.css";
import { tw } from "@/util/tailwind";

export default function TransactionDetailPage() {
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

        <div className="my-24 px-4 max-w-4xl flex flex-col items-center">
          {transaction && (
            <>
              <NftTradeCard trade={transaction} />
              <div className="mt-10 flex flex-col items-center w-full">
                <CommentInput transactionHash={transaction?.transactionHash} />
                <div className="w-full my-8">
                  <Rule />
                </div>
                <CommentList comments={transaction.comments ?? []} />
              </div>
            </>
          )}
        </div>
      </main>
    </>
  );
}
