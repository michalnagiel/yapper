import { deletePost } from "../api/apiService";

interface DeleteYapProps {
  yapId: number;
  onDeleteYap: (id: number) => void;
}

export default function DeleteYap(props: DeleteYapProps) {
  async function handleDeleteYap(): Promise<void> {
    try {
      await deletePost(props.yapId);
      props.onDeleteYap(props.yapId);
    } catch (error) {
      console.error("Delete post error", error);
      alert("Failed to delete the post. Please try again.");
    }
  }

  return (
    <>
      <button className="btn btn-outline-danger btn-sm" onClick={handleDeleteYap}>
        Delete Yap
      </button>
    </>
  );
}
