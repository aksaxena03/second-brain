import axios from "axios";
import Card from "./Card";
import { SidePanel } from "./SidePanel";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Backend_url = import.meta.env.VITE_Backend_url;

interface Content {
  title: string;
  Type: "youtube" | "facebook" | "x" | "document";
  link: string;
  _id?: string;
}

function SharedBrain() {
  const navigate = useNavigate();
  const params = useParams<{ sharedlink: string }>();
  const [content, setContent] = useState<Content[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleContent = async () => {
    try {
      if (!params.sharedlink) {
        navigate("/signin");
        return;
      }
      const response = await axios.get(
        `${Backend_url}/api/v1/content/${params.sharedlink}`
      );

      if (Array.isArray(response.data.content)) {
        setContent(response.data.content);
      } else {
        setError("No shared content found.");
      }
    } catch (err) {
      console.error(err);
      setError("Invalid or expired link.");
    }
  };

  useEffect(() => {
    handleContent();
  }, [params.sharedlink]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white flex">
      {error ? (
        <div className="m-auto text-center">
          <p className="text-red-400 text-xl">{error}</p>
        </div>
      ) : (
        <div className="flex w-full">
          <div className="fixed w-[10%] sm:w-[20%] h-full border-r border-gray-700">
            <SidePanel />
          </div>

          <div className="ml-[10%] sm:ml-[20%] w-full p-6">
            <div className="flex flex-wrap gap-4 justify-start">
              {content.map(({ title, Type, link, _id }) => (
                <Card key={_id} title={title} Type={Type} link={link} _id={_id!} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SharedBrain;
