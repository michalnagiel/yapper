import { useEffect, useState } from "react";
import { commentToggleLike } from "../api/apiService";

import DeleteComment from "./DeleteComment";

import { Comment } from "../types/types";

import "../styles/CommentCard.scss";

interface CommentCardProps {
  comment: Comment;
  likedBy: string[];
  onDeleteComment: (id: number) => void;
  onUserSelection: (username: string) => void;
  isAuthenticated: boolean;
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

  useEffect(() => {
    if (props.isAuthenticated) {
      setLike(props.likedBy.includes(getUsername()) ? "❤️" : "🤍");
    } else {
      setLike("🤍");
    }
  }, [props.isAuthenticated, props.likedBy]);


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
      <span className="like" onClick={likeClicked}>
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
