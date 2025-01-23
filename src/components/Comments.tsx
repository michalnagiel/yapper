import { useEffect, useState } from "react";
import { Comment } from "../types/types";
import CommentCard from "./CommentCard";
import { getComments } from "../api/apiService";
import AddComment from "./AddComment";

interface CommentsProps {
  yapId: number;
}

export default function Comments(props: CommentsProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const handleAddComment = (newComment: Comment) => {
    setComments((prevComments) => [newComment, ...prevComments]);
  };

  const handleDeleteComment = (commentId: number) => {
    setComments((prevComments) => prevComments.filter((comment) => comment.id !== commentId));
  };

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const data = await getComments(props.yapId);
        setComments(data);
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

  return (
    <>
      <div>Comments:</div>
      <AddComment yapId={props.yapId} onPostComment={handleAddComment}/>
      {comments.length === 0 ? (
        <div>No comments yet.</div>
      ) : (
        comments.slice().map((comment) => (
          <CommentCard key={comment.id} comment={comment} onDeleteComment={handleDeleteComment}/>
        ))
      )}
    </>
  );
}
