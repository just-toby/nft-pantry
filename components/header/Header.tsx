import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import Link from "next/link";

import { tw } from "@/util/tailwind";

export function Header() {
  return (
    <div
      className={tw(
        "fixed top-0 w-full p-4 justify-between flex items-center",
        "bg-gradient-to-b from-white to-transparent",
        "z-50"
      )}
    >
      <Link href="/">
        <Image src="/logo.svg" alt="Logo" width={32} height={32} />
      </Link>
      <ConnectButton
        label="connect"
        accountStatus="address"
        showBalance={false}
      />
    </div>
  );
}
