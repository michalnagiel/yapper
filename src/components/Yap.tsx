import { useState } from "react";
import { Post } from "../types/types";
import DeleteYap from "./DeleteYap";
import Comments from "./Comments";
import YapStatistics from "./YapStatistics";
import "../styles/Yap.scss";

interface YapProps {
  post: Post;
  selectedHashtag: number;
  selectedUser: string;
  onDeleteYap: (id: number) => void;
  onHashtagSelection: (id: number) => void;
  onUserSelection: (username: string) => void;
}

function Yap(props: YapProps) {
  const [isDeleted, setIsDeleted] = useState<boolean>(false);
  const [numberOfComments, setNumberOfComments] = useState<number>(0);
  const [showAddCommentComponent, setShowAddCommentComponent] =
    useState<boolean>(false);

  const isAuthor =
    localStorage.getItem("username") === props.post.author.toString();

  const handleDeleteYap = () => {
    setIsDeleted(true);
    props.onDeleteYap(props.post.id);
  };

  const handleNumberOfCommentsUpdate = (numberOfComments: number) => {
    setNumberOfComments(numberOfComments);
  };

  const handleAddComment = () => {
    setNumberOfComments(numberOfComments + 1);
  };

  const handleDeleteComment = () => {
    setNumberOfComments(numberOfComments - 1);
  };

  const handleShowAddCommentComponentToggle = () => {
    setShowAddCommentComponent(!showAddCommentComponent);
  };

  const handleHashtagsInContent = (content: string) => {
    const regex = /#(\w+)/g;
    const parts = content.split(regex);

    return parts.map((part, index) => {
      if (index % 2 !== 0) {
        const hashtag = part;
        return (
          <span
            key={index}
            style={{ color: "blue", cursor: "pointer" }}
            onClick={() =>
              props.onHashtagSelection(
                props.post.hashtags.find((tag) => tag.name === hashtag)?.id ?? 0
              )
            }
          >
            #{hashtag}
          </span>
        );
      }
      return part;
    });
  };

  if (isDeleted) return null;

  if (
    (props.selectedHashtag === 0 ||
      props.post.hashtags.some(
        (hashtag) => hashtag.id === props.selectedHashtag
      )) &&
    (props.selectedUser === "" || props.post.author === props.selectedUser)
  ) {
    return (
      <div className="card border-dark mb-3">
        <div className="card-header">
          <span>
            <span className="username" onClick={() => props.onUserSelection(props.post.author)}>@{props.post.author} </span>
            <span>
              {new Intl.DateTimeFormat("pl-PL", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              }).format(new Date(props.post.created_at))}
            </span>
          </span>
          {isAuthor ? (
            <DeleteYap yapId={props.post.id} onDeleteYap={handleDeleteYap} />
          ) : null}
        </div>
        <div className="card-body">
          <p className="card-text">
            {handleHashtagsInContent(props.post.content)}
          </p>
          <YapStatistics
            comments={numberOfComments}
            likedBy={props.post.liked_by}
            yapId={props.post.id}
            onCommentPictogramClick={handleShowAddCommentComponentToggle}
          />
          <Comments
            yapId={props.post.id}
            onNumberOfCommentsUpdate={handleNumberOfCommentsUpdate}
            onAddComment={handleAddComment}
            onDeleteComment={handleDeleteComment}
            onUserSelection={props.onUserSelection}
            showAddCommentComponent={showAddCommentComponent}
          />
        </div>
      </div>
    );
  }

  return null;
}

export default Yap;
