import { useEffect, useState } from "react";
import { getPosts } from "../api/apiService";

import Yap from "./Yap";
import LogInForm from "./LogInForm";

import { Post } from "../types/types";
import CreateYap from "./CreateYap";

export default function Yaps() {
  const [yaps, setYaps] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const handleCreateYap = (newYap: Post) => {
    setYaps((prevYaps) => [newYap, ...prevYaps]);
  };

  const handleDeleteYap = (yapId: number) => {
    setYaps((prevYaps) => prevYaps.filter((yap) => yap.id !== yapId));
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
    <div>
      <LogInForm />
      <CreateYap onCreateYap={handleCreateYap} />
      {yaps
        .slice()
        .map((yap) => (
          <Yap key={yap.id} post={yap} onDeleteYap={handleDeleteYap} />
        ))}
    </div>
  );
}
