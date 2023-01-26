export function getTxHashWithPrefix(hash?: string): `0x${string}` {
  if (hash?.startsWith("0x")) {
    return hash as `0x${string}`;
  }
  return `0x${hash}`;
}

export function shortenAddress(address: string, length = 4): string {
  return `${address.slice(0, length + 2)}...${address.slice(-length)}`;
}
