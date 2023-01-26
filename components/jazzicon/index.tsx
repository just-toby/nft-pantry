import Jazzicon, { jsNumberForAddress } from "react-jazzicon";

export default function Identicon({
  size,
  seed,
}: {
  size?: number;
  seed: string;
}) {
  return <Jazzicon diameter={size ?? 44} seed={jsNumberForAddress(seed)} />;
}
