import { tw } from "@/util/tailwind";

export default function Rule({ verticalSpace }: { verticalSpace?: number }) {
  return (
    <div
      className={tw(
        `my-${verticalSpace ?? 2}`,
        "w-full max-w-auto mx-1 border-b border-outline"
      )}
    />
  );
}
