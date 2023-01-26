import { BigNumberish } from "ethers";

import { ETH_ADDRESS } from "@/constants/addresses";

import { NftTradeCard } from "./NftTradeCard";

export type Trade = {
  id: string;
  tokenId: number;
  contractAddress: string;
  parentComment: string;
  price: BigNumberish;
  currency: string;
  timestamp: number;
  to: string;
  from: string;
};

export function Feed() {
  // todo: query list of transactions
  const trades: Trade[] = [
    {
      id: "1",
      tokenId: 0,
      contractAddress: "0x8a90cab2b38dba80c64b7734e58ee1db38b8992e",
      parentComment: "This is a comment",
      price: "100000000000000000",
      currency: ETH_ADDRESS,
      timestamp: Date.now() - 1000 * 60 * 60 * 24 * 2, // 2 days ago
      to: "0x9e91f274f175388dd1950799fa69e00d699ae2ee",
      from: "0xf7599b9237680ea12df90cdccc79f37956a68086",
    },
    {
      id: "1",
      tokenId: 10,
      contractAddress: "0x8a90cab2b38dba80c64b7734e58ee1db38b8992e",
      parentComment: "This is a comment",
      price: "100000000000000000",
      currency: ETH_ADDRESS,
      timestamp: Date.now() - 1000 * 60 * 60 * 24, // 1 day ago
      to: "0x9e91f274f175388dd1950799fa69e00d699ae2ee",
      from: "0xf7599b9237680ea12df90cdccc79f37956a68086",
    },
    {
      id: "1",
      tokenId: 100,
      contractAddress: "0x8a90cab2b38dba80c64b7734e58ee1db38b8992e",
      parentComment: "This is a comment",
      price: "100000000000000000",
      currency: ETH_ADDRESS,
      timestamp: Date.now() - 1000 * 60 * 60 * 24 * 3, // 3 days ago
      to: "0x9e91f274f175388dd1950799fa69e00d699ae2ee",
      from: "0xf7599b9237680ea12df90cdccc79f37956a68086",
    },
  ];

  return (
    <div className="flex flex-col w-full items-center">
      {trades.map((t) => {
        return (
          <div key={t.id} className="border border-black p-4 rounded-lg my-4">
            <NftTradeCard trade={t} />
          </div>
        );
      })}
    </div>
  );
}
