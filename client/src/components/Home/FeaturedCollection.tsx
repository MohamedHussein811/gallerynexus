import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../Loading/Loading";
import { DisableRightClick, api } from "../../constants/constants";
import ArtworkItem from "../Art/ArtworkItem/ArtworkItem";
interface ArtData {
  _id: string;
  title: string;
  category: string;
  image: string[];
  size: string;
  price: number;
}
interface UserData {
  _id: string;
  username: string;
  email: string;
  isArtist: boolean;
  artworks: ArtData[];
  profileImage: string;
  bio: string;
}
export default function FeaturedCollection() {
  const [artData, setArtData] = useState<ArtData[] | null>(null);
  const [rerender, setRerender] = useState(false);
  DisableRightClick();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!artData) {
          const response = await axios.get(`${api}/getartworkbycategory/All`);
          const shuffledArtworks = shuffleArray(response.data.artworks);
          setArtData(shuffledArtworks);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [artData,rerender]);

  const shuffleArray = (array: any[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  return (
    <div className=" mx-auto px-4">
    {artData ? (
          <ul className="grid grid-cols-2 md:grid-cols-6 gap-8">
            {artData.slice(0, 6).map((artwork, index) => (
              <ArtworkItem
                key={artwork._id}
                artwork={artwork}
                setRerender={setRerender}
              />
            ))}
          </ul>
      ) : (
        <Loading />
      )}
    </div>
  );
}