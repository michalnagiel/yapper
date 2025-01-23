import { useState } from "react";
import { postComment } from "../api/apiService";
import { Comment } from "../types/types";

interface CreateCommentProps {
  yapId: number;
  onPostComment: (post: Comment) => void;
}

export default function AddComment(props: CreateCommentProps) {
  const [content, setContent] = useState<string>("");

  const handleContentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await postComment(props.yapId, content);
      console.log("Comment added successfully: ", response);
      props.onPostComment({
        id: response.id,
        content: response.content,
        author: response.author,
        created_at: response.created_at,
        likes_count: response.likes_count,
        is_liked: response.is_liked,
      });
      setContent("");
    } catch (error) {
      console.log("Error adding post: ", error);
    }
  };

  return (
    <div>
      <h2>Add comment</h2>
      <form onSubmit={handleSubmit}>
        <label>Comment content</label>
        <input
          type="text"
          value={content}
          onChange={handleContentChange}
          placeholder="Enter comment content"
        />
        <button type="submit">Add Comment</button>
      </form>
    </div>
  );
}
