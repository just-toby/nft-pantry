import { useMemo } from "react";

import { Comment as TxComment } from "@/gql/types";

import { Comment } from "./Comment";

export function CommentList({ comments }: { comments: TxComment[] }) {
  const sortedComments = useMemo(() => {
    return comments.sort((a, b) => Number(b.timestamp) - Number(a.timestamp));
  }, [comments]);

  return (
    <div className="w-full flex flex-col items-center">
      {sortedComments.map((comment, index) => (
        <div key={comment.id + index} className="w-full">
          <Comment comment={comment} />
        </div>
      ))}
    </div>
  );
}
