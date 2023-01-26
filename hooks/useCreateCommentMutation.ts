import { useCallback } from "react";

import { useGraphQLClientSdk } from "@/graphql/GraphQLContext";

export function useCreateCommentMutation() {
  const sdk = useGraphQLClientSdk();
  return useCallback(
    async (
      message: string,
      signature: string,
      signer: string,
      transactionHash: string
    ) => {
      console.log({
        message,
        signature,
        signer,
        transactionHash,
      });
      const result = await sdk?.CreateComment({
        message,
        signature,
        signer,
        transactionHash,
      });
      return result?.data?.addComment?.status === 200;
    },
    [sdk]
  );
}
