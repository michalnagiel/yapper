import { useState } from "react";
import { addPost } from "../api/apiService";
import { Post } from "../types/types"

interface CreateYapProps {
  onCreateYap: (post: Post) => void;
}

export default function CreateYap(props: CreateYapProps) {
  const [content, setContent] = useState<string>("");
  const [hashtags, setHashtags] = useState<string[]>([]);

  const handleContentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value);
  };

  const handleHashtagsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    const hashtagArray = input.split(" ").filter((tag) => tag.trim() !== "");
    setHashtags(hashtagArray);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
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
      setHashtags([]);
    } catch (error) {
      console.log("Error adding post: ", error);
    }
  };

  return (
    <div>
      <h2>Create Yap</h2>
      <form onSubmit={handleSubmit}>
        <label>Yap content:</label>
        <input type="text" value={content} onChange={handleContentChange} placeholder="Enter Yap content"/>
        <label>Hashtags:</label>
        <input
          type="text"
          value={hashtags}
          onChange={handleHashtagsChange}
          placeholder="Enter hashtags separated by spaces"
        />
        <p>Current hashtags: {hashtags.map((tag) => `#${tag}`).join(" ")}</p>
        <button type="submit">Create Yap</button>
      </form>
    </div>
  );
}
