import { useNavigate, useParams } from "react-router-dom";
import { MoveLeft } from "lucide-react";

export default function WatchPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <div className="text-white p-10">Invalid movie ID</div>;
  }
  return (
    <div className="relative">
      <button
        onClick={() => navigate(-1)}
        className="cursor-pointer flex absolute top-4 left-4 gap-2 text-gray-300 "
      >
        <MoveLeft className=" w-4" />
        Back
      </button>
      <iframe
        src={`https://vaplayer.ru/embed/movie/${id}?skin=netflix&color=5865f2`}
        width="100%"
        height="600"
        frameBorder="0"
        allowFullScreen
        allow="autoplay; encrypted-media; picture-in-picture"
      ></iframe>
    </div>
  );
}
