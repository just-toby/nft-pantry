import useSWR from "swr";

import { FeedItem } from "@/gql/types";
import { useGraphQLClientSdk } from "@/graphql/GraphQLContext";

import Rule from "../Rule";
import { NftTradeCard } from "./NftTradeCard";

export function Feed() {
  const sdk = useGraphQLClientSdk();
  const { data: trades } = useSWR("NftFeed", async () => {
    const result = await sdk?.FeedQuery();
    return result?.data?.feed;
  });

  return (
    <div className="flex flex-col w-full items-center px-8">
      {trades?.map((t: FeedItem) => {
        return (
          <>
            <NftTradeCard trade={t} key={t.id} />
            <Rule verticalSpace={8} key={t.id + "rule"} />
          </>
        );
      })}
    </div>
  );
}
