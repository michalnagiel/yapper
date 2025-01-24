import { useState } from "react";
import { Comment } from "../types/types";
import DeleteComment from "./DeleteComment";

import "../styles/CommentCard.scss";
import { commentToggleLike } from "../api/apiService";

interface CommentCardProps {
  comment: Comment;
  likedBy: string[];
  onDeleteComment: (id: number) => void;
  onUserSelection: (username: string) => void;
}

export default function CommentCard(props: CommentCardProps) {
  const [isDeleted, setIsDeleted] = useState<boolean>(false);
  const getUsername = (): string => {
    return localStorage.getItem("username") || "";
  };
  const [like, setLike] = useState(
    props.likedBy.includes(getUsername()) ? "❤️" : "🤍"
  );

  const isAuthor =
    localStorage.getItem("username") === props.comment.author.toString();

  const handleDeleteComment = () => {
    setIsDeleted(true);
    props.onDeleteComment(props.comment.id);
  };

  const [numberOfLikes, setNumberOfLikes] = useState(props.likedBy.length);

  const likeClicked = async () => {
    if (like === "🤍") {
      setLike("❤️");
      await commentToggleLike(props.comment.id);
      setNumberOfLikes(numberOfLikes + 1);
    } else {
      setLike("🤍");
      await commentToggleLike(props.comment.id);
      setNumberOfLikes(numberOfLikes - 1);
    }
  };

  if (isDeleted) return null;
  return (
    <div className="comment-card">
      <div className="comment">
        <span
          className="username"
          onClick={() => props.onUserSelection(props.comment.author)}
        >
          @{props.comment.author}:{" "}
        </span>
        <span>{props.comment.content}</span>
      </div>
      <span onClick={likeClicked}>
        {like}
        {numberOfLikes}
      </span>
      <div className="delete-comment">
        {isAuthor ? (
          <DeleteComment
            commentId={props.comment.id}
            onDeleteComment={handleDeleteComment}
          />
        ) : null}
      </div>
    </div>
  );
}
