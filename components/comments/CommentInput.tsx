import { verifyMessage } from "ethers/lib/utils.js";
import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { mutate } from "swr";
import { useAccount, useSignMessage } from "wagmi";

import { useCreateCommentMutation } from "@/hooks/useCreateCommentMutation";
import { isNullOrEmpty } from "@/util";
import { getTxHashWithPrefix } from "@/util/addresses";
import { tw } from "@/util/tailwind";

const Jazzicon = dynamic(() => import("../jazzicon"), {
  ssr: false,
});

export function CommentInput({ transactionHash }: { transactionHash: string }) {
  const [comment, setComment] = useState("");

  const { address } = useAccount();
  const { isLoading, signMessage } = useSignMessage({
    onError: () => {
      toast.error("Signature Failed");
    },
    onSuccess: async (data, variables) => {
      const address = verifyMessage(variables.message, data);
      const result = await createComment(
        comment,
        data,
        address,
        transactionHash
      );
      if (result) {
        mutate("TransactionDetails" + transactionHash);
        toast.success("Comment sent!");
      }
    },
  });

  const createComment = useCreateCommentMutation();

  const buttonDisabled = useMemo(() => {
    return isNullOrEmpty(comment);
  }, [comment]);

  return (
    <div className="flex items-center w-full justify-between">
      <div className="flex flex-row items-center w-min">
        <div className="mr-4">
          <Jazzicon seed={getTxHashWithPrefix(address)} />
        </div>

        <input
          type="text"
          className="max-w-[15rem] outline-none mr-2"
          placeholder="Add a comment..."
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
          }}
        />
      </div>
      <button
        className={tw(
          "text-white bg-pink rounded-lg py-2 px-4",
          buttonDisabled ? "opacity-50 cursor-not-allowed" : ""
        )}
        disabled={buttonDisabled}
        onClick={async () => {
          if (isNullOrEmpty(address)) {
            toast.error("Connect your wallet to perform this action.");
            return;
          }
          if (isNullOrEmpty(comment)) {
            toast.error("Enter a comment to perform this action.");
            return;
          }

          signMessage({ message: comment });
        }}
      >
        {isLoading ? "Sign..." : "Send"}
      </button>
    </div>
  );
}
