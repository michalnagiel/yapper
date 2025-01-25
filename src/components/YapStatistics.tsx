import { useState, useEffect } from "react";
import { postToggleLike } from "../api/apiService";

import "../styles/YapStatistics.scss";

interface YapStatisticsProps {
  likedBy: string[];
  comments: number;
  yapId: number;
  onCommentPictogramClick: () => void;
  isAuthenticated: boolean;
}

export default function YapStatistics(props: YapStatisticsProps) {
  const getUsername = (): string => {
    return localStorage.getItem("username") || "";
  };

  const [like, setLike] = useState(
    props.likedBy.includes(getUsername()) ? "❤️" : "🤍"
  );
  const [numberOfLikes, setNumberOfLikes] = useState(props.likedBy.length);

  const likeClicked = async () => {
    if (!props.isAuthenticated) return;

    if (like === "🤍") {
      setLike("❤️");
      await postToggleLike(props.yapId);
      setNumberOfLikes(numberOfLikes + 1);
    } else {
      setLike("🤍");
      await postToggleLike(props.yapId);
      setNumberOfLikes(numberOfLikes - 1);
    }
  };

  useEffect(() => {
    if (props.isAuthenticated) {
      setLike(props.likedBy.includes(getUsername()) ? "❤️" : "🤍");
    } else {
      setLike("🤍");
    }
  }, [props.isAuthenticated, props.likedBy]);

  return (
    <div className="yap-statistics">
      <span className="like" onClick={likeClicked}>
        {like}
        {numberOfLikes}
      </span>
      <span className="comment-pictogram" onClick={props.onCommentPictogramClick}>
        💬{props.comments}
      </span>
    </div>
  );
}
