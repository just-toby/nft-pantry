import { ethers } from "ethers";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useEnsName } from "wagmi";

import { DEFAULT_IMG_URL, getAddressURL, getBlockURL } from "@/constants";
import { FeedItem } from "@/gql/types";
import { isNullOrEmpty } from "@/util";
import { getTxHashWithPrefix, shortenAddress } from "@/util/addresses";
import { tw } from "@/util/tailwind";

const Jazzicon = dynamic(() => import("../jazzicon"), {
  ssr: false,
});

export function NftTradeCard({ trade }: { trade: FeedItem }) {
  // todo: support multiple NFTs for a given transaction
  const firstNft = trade.nfts[0];

  const { data: ens } = useEnsName({
    address: getTxHashWithPrefix(trade.buyerAddress),
  });

  return (
    <div
      className={tw(
        "flex flex-col items-center justify-center",
        "w-full rounded-2xl"
      )}
    >
      <div className="flex flex-row w-full mb-4 ">
        <Jazzicon seed={trade.buyerAddress} />
        <div className="flex flex-col ml-2">
          <a
            href={getAddressURL(trade.buyerAddress)}
            target="_blank"
            className="text-xl"
            rel="noreferrer"
          >
            {isNullOrEmpty(ens) ? shortenAddress(trade.buyerAddress) : ens}
          </a>
          <a
            href={getBlockURL(trade.blockNumber)}
            target="_blank"
            rel="noreferrer"
            className="text-sm text-gray-400"
          >
            Block #{trade.blockNumber}
          </a>
        </div>
      </div>
      <div className="mb-4 font-bold w-full">
        Bought #{firstNft.tokenId} for{" "}
        {ethers.utils.formatEther(firstNft.price ?? 0)} ETH
      </div>
      {trade.parentComment && (
        <div className="w-full mb-4">{trade.parentComment.text}</div>
      )}
      <Link href={`/${trade.transactionHash}`}>
        <Image
          src={firstNft.imageUrl ?? DEFAULT_IMG_URL}
          alt={"NFT image"}
          width="300"
          height="300"
          className="rounded-2xl"
        />
      </Link>
    </div>
  );
}
