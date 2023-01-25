import { ConnectButton } from "@rainbow-me/rainbowkit";

export function Header() {
  return (
    <div className="fixed top-0 w-full px-12 py-4 justify-between flex items-center">
      <div className="text-2xl">NFT Social Feed</div>
      <ConnectButton
        label="connect"
        accountStatus="address"
        showBalance={false}
      />
    </div>
  );
}
