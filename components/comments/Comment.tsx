import moment from "moment";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import { useEnsName } from "wagmi";

import { Comment as TxComment } from "@/gql/types";
import { isNullOrEmpty } from "@/util";
import { getTxHashWithPrefix, shortenAddress } from "@/util/addresses";

const Jazzicon = dynamic(() => import("../jazzicon"), {
  ssr: false,
});

export function Comment({ comment }: { comment: TxComment }) {
  const { data: ens } = useEnsName({
    address: getTxHashWithPrefix(comment.address),
  });

  const commentText = useMemo(() => {
    return (
      <span style={{ maxWidth: "200px" }} className="overflow-hidden mr-8">
        {comment.text}
      </span>
    );
  }, [comment.text]);

  const timestamp = useMemo(() => {
    return moment(new Date(Number(comment.timestamp))).fromNow();
  }, [comment.timestamp]);

  return (
    <div className="flex w-full flex-col md:flex-row md:items-center justify-between mb-8">
      <div className="flex flex-row items-center">
        <div>
          <Jazzicon seed={comment.address} />
        </div>
        <div className="flex flex-col ml-4">
          <span className="text-secondary mb-1">
            {isNullOrEmpty(ens) ? shortenAddress(comment.address) : ens}
          </span>
          <span className="hidden md:block">{commentText}</span>
          <div className="text-secondary block md:hidden">{timestamp}</div>
        </div>
      </div>
      <div className="text-secondary hidden md:block">{timestamp}</div>
      <span className="block md:hidden mt-4">{commentText}</span>
    </div>
  );
}
