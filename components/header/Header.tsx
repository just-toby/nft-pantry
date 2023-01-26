import { ConnectButton } from "@rainbow-me/rainbowkit";

import { tw } from "@/util/tailwind";

export function Header() {
  return (
    <div
      className={tw(
        "fixed top-0 w-full px-12 py-4 justify-between flex items-center",
        "bg-gradient-to-b from-black to-[#000000CC]"
      )}
    >
      <div className="text-2xl">NFT Social Feed</div>
      <ConnectButton
        label="connect"
        accountStatus="address"
        showBalance={false}
      />
    </div>
  );
}
