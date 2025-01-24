import { useEffect, useState } from "react";
import { Comment } from "../types/types";
import CommentCard from "./CommentCard";
import { getComments } from "../api/apiService";
import AddComment from "./AddComment";

import "../styles/Comments.scss";

interface CommentsProps {
  yapId: number;
  showAddCommentComponent: boolean;
  onNumberOfCommentsUpdate: (numberOfComments: number) => void;
  onAddComment: () => void;
  onDeleteComment: () => void;
}

export default function Comments(props: CommentsProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  let numberOfComments: number;

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const data = await getComments(props.yapId);
        setComments(data);
        numberOfComments = data.length;
        props.onNumberOfCommentsUpdate(numberOfComments);
      } catch (err) {
        setError("Failed to fetch yaps.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchComments();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleAddComment = (newComment: Comment) => {
    setComments((prevComments) => [...prevComments, newComment]);
    props.onAddComment();
  };

  const handleDeleteComment = (commentId: number) => {
    setComments((prevComments) =>
      prevComments.filter((comment) => comment.id !== commentId)
    );
    props.onDeleteComment();
  };

  return (
    <>
      <div className="comments-header">Comments</div>
      <div className="header-body">
        {comments.length === 0 ? (
          <div>No comments yet.</div>
        ) : (
          comments
            .slice()
            .map((comment) => (
              <CommentCard
                key={comment.id}
                comment={comment}
                onDeleteComment={handleDeleteComment}
              />
            ))
        )}
        {localStorage.getItem("token") && props.showAddCommentComponent ? (
          <AddComment yapId={props.yapId} onPostComment={handleAddComment} />
        ) : null}
      </div>
    </>
  );
}
