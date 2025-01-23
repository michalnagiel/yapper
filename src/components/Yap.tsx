import { useState } from "react";
import { Post } from "../types/types";
import DeleteYap from "./DeleteYap";
import Comments from "./Comments";

interface YapProps {
  post: Post;
  onDeleteYap: (id: number) => void;
}

function Yap(props: YapProps) {
  const [isDeleted, setIsDeleted] = useState<boolean>(false);

  const isAuthor =
    localStorage.getItem("username") === props.post.author.toString();

  const handleDeleteYap = () => {
    setIsDeleted(true);
    props.onDeleteYap(props.post.id);
  };
  if (isDeleted) return null;


  return (
    <div className="card border-dark mb-3">
      <div className="card-header">
        <p>{new Date(props.post.created_at).toLocaleString()}</p>
        <p>{props.post.author}</p>
        <p>Yap id: {props.post.id}</p>
      </div>
      <div className="card-body">
        <p className="card-text">{props.post.content}</p>
        <p>{props.post.hashtags.map((tag) => `#${tag.name}`).join(", ")}</p>
      </div>
      {isAuthor ? (
        <DeleteYap yapId={props.post.id} onDeleteYap={handleDeleteYap} />
      ) : null}
      <Comments yapId={props.post.id} />
    </div>
  );
}

export default Yap;
