import { useEffect, useState } from "react";
import { getPosts } from "../api/apiService";

import Yap from "./Yap";
import LogInForm from "./LogInForm";

import { Post } from "../types/types";
import CreateYap from "./CreateYap";

import "../styles/Yaps.scss";

interface YapsProps {
  onAuthenticationChange: () => void;
}

export default function Yaps(props: YapsProps) {
  const [yaps, setYaps] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedHashtag, setSelectedHashtag] = useState<number>(0);

  const handleCreateYap = (newYap: Post) => {
    setYaps((prevYaps) => [newYap, ...prevYaps]);
  };

  const handleDeleteYap = (yapId: number) => {
    setYaps((prevYaps) => prevYaps.filter((yap) => yap.id !== yapId));
  };

  const handleHashtagSelection = (id: number) => {
    setSelectedHashtag(id);
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
        <div
          onClick={() => setSelectedHashtag(0)}
          style={{
            cursor: "pointer",
            color: "blue",
            textDecoration: "underline",
          }}
        >
          Remove selected hashtag
        </div>
      ) : null}
      {yaps.slice().map((yap) => (
        <Yap
          key={yap.id}
          post={yap}
          onDeleteYap={handleDeleteYap}
          selectedHashtag={selectedHashtag}
          onHashtagSelection={handleHashtagSelection}
        />
      ))}
    </div>
  );
}
