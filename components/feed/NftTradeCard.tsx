import "react-responsive-carousel/lib/styles/carousel.min.css";

import { ethers } from "ethers";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/router";
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
  const router = useRouter();
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
      <div className="flex flex-row w-full mb-6 justify-between">
        <div>
          <div className="flex flex-row">
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
        </div>
        <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={() => {navigator.clipboard.writeText(window.location + trade.transactionHash)}} className="cursor-pointer">
          <rect width="44" height="44" rx="22" fill="#F5F6FC"/>
          <path d="M32.0007 12L21.0007 23" stroke="#7780A0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M32.0007 12L25.0007 32L21.0007 23L12.0007 19L32.0007 12Z" stroke="#7780A0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>

      <div className="w-full text-secondary">
        Purchased{nftDescription} for
        <span className="font-bold text-black mx-2">
          {ethers.utils.formatEther(trade.totalEth ?? 0)} ETH
        </span> on <span className="font-bold text-black">{trade.marketplace}</span>
      </div>
      {trade.parentComment && (
        <div className="w-full mb-6 mt-2">{trade.parentComment.text}</div>
      )}
      <Carousel
        className="cursor-pointer"
        axis="horizontal"
        infiniteLoop
        statusFormatter={() => ""}
        showThumbs={trade.nfts.length > 1}
        onClickItem={() => {
          router.push(`/${trade.transactionHash}`);
        }}
      >
        {trade.nfts?.map((nft) => {
          return (
            <Image
              priority
              key={nft?.id}
              src={nft.imageUrl ?? DEFAULT_IMG_URL}
              alt={"NFT image"}
              width="300"
              height="300"
              className="rounded-2xl"
            />
          );
        })}
      </Carousel>
    </div>
  );
}
