import { CommentInput } from "./CommentInput";

export function CommentList({ transactionHash }: { transactionHash: string }) {
  return (
    <div className="flex flex-col items-center w-full">
      <CommentInput transactionHash={transactionHash} />
      {/* todo: render list of comments */}
    </div>
  );
}
