import { ethers } from "ethers";
import dynamic from "next/dynamic";
import Image from "next/image";

import { shortenAddress } from "@/util/addresses";
import { tw } from "@/util/tailwind";

import { Trade } from "./Feed";

const Jazzicon = dynamic(() => import("../jazzicon"), {
  ssr: false,
});

export function NftTradeCard({ trade }: { trade: Trade }) {
  // todo: replace this with real NFT data queried from internal API
  const imageUrl =
    "https://cdn.center.app/1/0x8a90CAb2b38dba80c64b7734e58Ee1dB38B8992e/6169/711330c05dfadd89409896ebc879490d83bd10b64bdc3bf2493cd93f69ba4687.png";

  const txDate = new Date(trade.timestamp);

  return (
    <div
      className={tw(
        "flex flex-col items-center justify-center",
        "w-full rounded-lg"
      )}
    >
      <div className="flex flex-row w-full mb-4 ">
        <Jazzicon seed={trade.to} />
        <div className="flex flex-col ml-2">
          <div className="text-xl">{shortenAddress(trade.to)}</div>
          <div className="text-sm text-gray-400">
            {`${txDate.toLocaleDateString()} ${txDate.toLocaleTimeString()}`}
          </div>
        </div>
      </div>
      <div className="mb-4 font-bold w-full">
        Bought #{trade.tokenId} for {ethers.utils.formatEther(trade.price)} ETH
      </div>
      {trade.parentComment && (
        <div className="w-full mb-4">{trade.parentComment}</div>
      )}
      <Image
        src={imageUrl}
        alt={"NFT image"}
        width="300"
        height="300"
        className="rounded-lg"
      />
    </div>
  );
}
