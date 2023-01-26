export function filterNulls<T>(val: Array<T | null | undefined>): T[] {
  return val?.filter((v) => Boolean(v)) as T[];
}
