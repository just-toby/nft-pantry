import { GraphQLClient } from "graphql-request";
import React, { PropsWithChildren, useEffect, useState } from "react";

import { NFT_API_URL } from "@/constants";
import { getSdk, Sdk } from "@/gql/types";

const GraphQLContext = React.createContext<Sdk | undefined>(undefined);

export function useGraphQLClientSdk() {
  return React.useContext(GraphQLContext);
}

export function GraphQLProvider(props: PropsWithChildren) {
  const [sdk, setSdk] = useState<Sdk | undefined>(undefined);

  useEffect(() => {
    if (!sdk) {
      setSdk(
        getSdk(
          new GraphQLClient(NFT_API_URL, {
            headers: {
              "x-api-key": process.env.NEXT_PUBLIC_FEED_API_KEY ?? "",
            },
          })
        )
      );
    }
  }, [sdk]);

  return (
    <GraphQLContext.Provider value={sdk}>
      {props.children}
    </GraphQLContext.Provider>
  );
}
