import { deleteComment } from "../api/apiService";

interface DeleteCommentProps {
  commentId: number;
  onDeleteComment: (id: number) => void;
}

export default function DeleteComment(props: DeleteCommentProps) {
  async function handleDeleteComment(): Promise<void> {
    try {
      await deleteComment(props.commentId);
      props.onDeleteComment(props.commentId);
    } catch (error) {
      console.error("Delete comment error", error);
      alert("Failed to delete the comment. Please try again.");
    }
  }

  return (
    <>
      <button
        className="btn btn-outline-danger btn-sm"
        onClick={handleDeleteComment}
      >
        Delete Comment
      </button>
    </>
  );
}
