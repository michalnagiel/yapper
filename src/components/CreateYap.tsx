import { useState } from "react";
import { addPost } from "../api/apiService";
import { Post } from "../types/types";

import "../styles/CreateYap.scss";

interface CreateYapProps {
  onCreateYap: (post: Post) => void;
}

export default function CreateYap(props: CreateYapProps) {
  const [content, setContent] = useState<string>("");

  const handleContentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value);
  };

  const extractHashtags = (text: string): string[] => {
    const regex = /#\w+/g;
    const hashtags = text.match(regex) || [];
    return hashtags.map((tag) => tag.slice(1));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const hashtags = extractHashtags(content);

    try {
      const response = await addPost(content, hashtags);
      console.log("Post added successfully: ", response);
      props.onCreateYap({
        id: response.id,
        content: response.content,
        author: response.author,
        created_at: response.created_at,
        hashtags: response.hashtags,
      });
      setContent("");
    } catch (error) {
      console.log("Error adding post: ", error);
    }
  };

  return (
    <div>
      <form className="create-yap-form" onSubmit={handleSubmit}>
        <input
          className="create-yap-input"
          type="text"
          value={content}
          onChange={handleContentChange}
          placeholder="Enter Yap Content"
          maxLength={140}
        />
        <button
          className="create-yap-button btn btn-outline-primary"
          type="submit"
        >
          Create Yap
        </button>
      </form>
    </div>
  );
}
