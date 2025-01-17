import { Post } from "../types/types";

interface YapProps {
  post: Post;
}

function Yap({ post }: YapProps) {
  return (
    <div className="card border-dark mb-3">
      <div className="card-header">
        <p>{new Date(post.created_at).toLocaleString()}</p>
        <p>{post.author}</p>
      </div>
      <div className="card-body">
        <p className="card-text">{post.content}</p>
        <p>{post.hashtags.map((tag) => `#${tag.name}`).join(", ")}</p>
      </div>
    </div>
  );
}

export default Yap;
