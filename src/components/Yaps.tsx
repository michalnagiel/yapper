import { useEffect, useState } from "react";
import { getPosts } from "../api/apiService";

import CreateYap from "./CreateYap";
import LogInForm from "./LogInForm";
import Yap from "./Yap";

import { Post } from "../types/types";

import "../styles/Yaps.scss";

interface YapsProps {
  onAuthenticationChange: () => void;
}

export default function Yaps(props: YapsProps) {
  const [yaps, setYaps] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedHashtag, setSelectedHashtag] = useState<number>(0);
  const [selectedUser, setSelectedUser] = useState<string>("");

  const handleCreateYap = (newYap: Post) => {
    setYaps((prevYaps) => [newYap, ...prevYaps]);
  };

  const handleDeleteYap = (yapId: number) => {
    setYaps((prevYaps) => prevYaps.filter((yap) => yap.id !== yapId));
  };

  const handleHashtagSelection = (id: number) => {
    setSelectedHashtag(id);
  };

  const handleUserSelection = (username: string) => {
    setSelectedUser(username);
  };

  const getSelectedHashtagName = () => {
    for (let yap of yaps) {
      const hashtag = yap.hashtags.find(
        (hashtag) => hashtag.id === selectedHashtag
      );
      if (hashtag) {
        return hashtag.name;
      }
    }
    return null;
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts();
        setYaps(data.reverse());
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
    <div className="yaps-card">
      <LogInForm onAuthenticationChange={props.onAuthenticationChange} />
      {localStorage.getItem("token") ? (
        <CreateYap onCreateYap={handleCreateYap} />
      ) : null}
      {selectedHashtag !== 0 ? (
        <div className="selected-hashtag">
          Selected hashtag: {getSelectedHashtagName()}.{" "}
          <button
            className="btn btn-outline-danger btn-sm"
            onClick={() => setSelectedHashtag(0)}
          >
            Click to remove
          </button>
        </div>
      ) : null}
      {selectedUser !== "" ? (
        <div className="selected-hashtag">
          Selected user: {selectedUser}.{" "}
          <button
            className="btn btn-outline-danger btn-sm"
            onClick={() => setSelectedUser("")}
          >
            Click to remove
          </button>
        </div>
      ) : null}
      {yaps.slice().map((yap) => (
        <Yap
          key={yap.id}
          post={yap}
          onDeleteYap={handleDeleteYap}
          selectedHashtag={selectedHashtag}
          selectedUser={selectedUser}
          onHashtagSelection={handleHashtagSelection}
          onUserSelection={handleUserSelection}
        />
      ))}
    </div>
  );
}
