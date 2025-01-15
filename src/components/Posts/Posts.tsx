import { useEffect, useState } from "react";
import { getPosts } from "../apiService";

function Posts() {
  interface Hashtag {
    id: number;
    name: string;
  }

  interface Post {
    id: number;
    content: string;
    author: string;
    created_at: string;
    hashtags: Hashtag[];
  }

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts();
        setPosts(data);
      } catch (err) {
        setError("Failed to fetch posts.");
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
      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h2>{post.content}</h2>
            <p>
              <strong>Author:</strong> {post.author}
            </p>
            <p>
              <strong>Created At:</strong>{" "}
              {new Date(post.created_at).toLocaleString()}
            </p>
            <p>
              <strong>Hashtags:</strong>{" "}
              {post.hashtags.map((tag) => `#${tag.name}`).join(", ")}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Posts;
