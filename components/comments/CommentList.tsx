import { Comment as TxComment } from "@/gql/types";

import { Comment } from "./Comment";

export function CommentList({ comments }: { comments: TxComment[] }) {
  return (
    <div className="w-full flex flex-col items-center">
      {comments.map((comment, index) => (
        <div key={comment.id + index} className="w-full">
          <Comment comment={comment} />
        </div>
      ))}
    </div>
  );
}
