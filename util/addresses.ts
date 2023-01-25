export function getTxHashWithPrefix(hash?: string): `0x${string}` {
  if (hash?.startsWith("0x")) {
    return hash as `0x${string}`;
  }
  return `0x${hash}`;
}
