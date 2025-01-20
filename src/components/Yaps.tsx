import { useEffect, useState } from "react";
import { getPosts } from "../api/apiService";

import Yap from "./Yap";
import LogInForm from "./LogInForm";

import { Post } from "../types/types";

function Posts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts();
        setPosts(data);
      } catch (err) {
        setError("Failed to fetch yaps.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <LogInForm/>
      {posts
        .slice()
        .reverse()
        .map((post) => (
          <Yap key={post.id} post={post} />
        ))}
    </div>
  );
}

export default Posts;
