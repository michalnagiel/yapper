import { useState } from "react";
import { Comment } from "../types/types";
import DeleteComment from "./DeleteComment";

interface CommentCardProps {
  comment: Comment;
  onDeleteComment(id: number): void;
}

export default function CommentCard(props: CommentCardProps) {
  const [isDeleted, setIsDeleted] = useState<boolean>(false);

  const isAuthor =
    localStorage.getItem("username") === props.comment.author.toString();

  const handleDeleteComment = () => {
    setIsDeleted(true);
    props.onDeleteComment(props.comment.id);
  };
  
  if (isDeleted) return null;
  return (
    <div>
      <span>{props.comment.author}: </span>
      <span>{props.comment.content}</span>
      {isAuthor ? (
        <DeleteComment
          commentId={props.comment.id}
          onDeleteComment={handleDeleteComment}
        />
      ) : null}
    </div>
  );
}
