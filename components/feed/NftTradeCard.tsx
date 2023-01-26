import "react-responsive-carousel/lib/styles/carousel.min.css";

import { ethers } from "ethers";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { Carousel } from "react-responsive-carousel";
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

  const nftDescription = useMemo(() => {
    if (trade.nfts?.length > 1) {
      return (
        <span className="font-bold text-black mx-2">
          {trade.nfts.length} NFTs
        </span>
      );
    }
    return (
      <span className="font-bold text-black mx-2">
        {firstNft.collectionName} #{firstNft.tokenId}
      </span>
    );
  }, [firstNft.collectionName, firstNft.tokenId, trade.nfts.length]);

  return (
    <div
      className={tw(
        "flex flex-col items-center justify-center",
        "w-full rounded-2xl p-3 "
      )}
    >
      <div className="flex flex-row w-full mb-6 ">
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
            className="text-sm text-secondary"
          >
            Block #{trade.blockNumber}
          </a>
        </div>
      </div>
      <div className="w-full text-secondary">
        Purchased {nftDescription}
        for{" "}
        <span className="font-bold text-black">
          {ethers.utils.formatEther(firstNft.price ?? 0)} ETH
        </span>
      </div>
      {trade.parentComment && (
        <div className="w-full mb-6 mt-2">{trade.parentComment.text}</div>
      )}
      <Carousel axis="horizontal" infiniteLoop statusFormatter={() => ""}>
        {trade.nfts?.map((nft) => {
          return (
            <Link href={`/${trade.transactionHash}`} key={nft.id}>
              <Image
                src={nft.imageUrl ?? DEFAULT_IMG_URL}
                alt={"NFT image"}
                width="300"
                height="300"
                className="rounded-2xl"
              />
            </Link>
          );
        })}
      </Carousel>
    </div>
  );
}
