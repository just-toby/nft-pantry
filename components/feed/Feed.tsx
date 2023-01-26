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
    <div className="flex flex-col w-full items-center px-8 max-w-xl">
      {trades?.map((t: FeedItem, index: number) => {
        return (
          <>
            <NftTradeCard trade={t} key={t.id + index} />
            <div className="w-full my-8" key={t.id + index + "rule"}>
              <Rule />
            </div>
          </>
        );
      })}
    </div>
  );
}
