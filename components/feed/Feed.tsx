import useSWR from "swr";

import { FeedItem } from "@/gql/types";
import { useGraphQLClientSdk } from "@/graphql/GraphQLContext";

import { NftTradeCard } from "./NftTradeCard";

export function Feed() {
  const sdk = useGraphQLClientSdk();
  const { data: trades } = useSWR("NftFeed", async () => {
    const result = await sdk?.FeedQuery();
    console.log({ result });
    return result?.data?.feed;
  });

  return (
    <div className="flex flex-col w-full items-center">
      {trades?.map((t: FeedItem) => {
        return (
          <div key={t.id} className="p-4 rounded-lg my-4">
            <NftTradeCard trade={t} />
          </div>
        );
      })}
    </div>
  );
}
