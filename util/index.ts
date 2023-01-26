export function filterNulls<T>(val: Array<T | null | undefined>): T[] {
  return val?.filter((v) => Boolean(v)) as T[];
}

export function isNullOrEmpty(
  x: string | null | undefined | Array<unknown>
): boolean {
  return (x?.length ?? 0) === 0;
}
