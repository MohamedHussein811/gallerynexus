import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../Loading/Loading";
import { api } from "../../constants/constants";
import ArtComponent from "../ArtComponent/ArtComponent";
interface ArtData {
  _id: string;
  title: string;
  category: string;
  image: string[];
  size: string;
  price: number;
}

export default function FeaturedCollection() {
  const [artData, setArtData] = useState<ArtData[] | null>(null);

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
  }, [artData]);

  const shuffleArray = (array: any[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  return (
    <div className="flex justify-center ">
      <div className="flex flex-wrap justify-center md:justify-start space-x-4 py-4">
        {artData ? (
          artData.slice(0, 6).map((artwork, index) => <ArtComponent key={index} artwork={artwork} />)
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
}
