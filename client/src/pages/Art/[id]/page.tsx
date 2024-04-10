import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../../../components/Loading/Loading";
import { api } from "../../../constants/constants";
import NotFound from "../../../not-found";
import ArtImage from "../../../components/ArtDetails/ArtImage";
import ArtDetails from "../../../components/ArtDetails/ArtDetails";
import More from "../../../components/ArtDetails/More";
import ArtReview from "../../../components/ArtDetails/ArtReview";
import { useParams } from "react-router-dom";

interface ArtData {
  title: string;
  category: string;
  image: string[];
  size: string;
  price: number;
}
interface userData {
  userId: string;
  userName: string;
  ArtData: ArtData;
}

export default function ArtPage() {
  const { id } = useParams();
  const [artData, setArtData] = useState<ArtData | null>(null);

  const [userData, setUserData] = useState<userData | null>(null);

  const [notFound, setNotFound] = useState<boolean>(false);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${api}/getartworkbyid/${id}`);
        if (response.data.artwork) {
          setArtData(response.data.artwork);
          setUserData(response.data);
        } else {
          setNotFound(true);
        }
      } catch (error) {
        console.error("Error fetching artwork:", error);
        setNotFound(true);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === (artData?.image.length ?? 0) - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? (artData?.image.length ?? 0) - 1 : prevIndex - 1
    );
  };

  if (notFound) {
    return <NotFound />;
  }

  return (
    <>
      {artData ? (
        <>
          <div className="flex flex-col justify-center lg:flex-row gap-4 items-center p-8 rounded-lg shadow-lg">
            <ArtImage
              currentImageIndex={currentImageIndex}
              artData={artData}
              nextImage={nextImage}
              prevImage={prevImage}
            />
            <ArtDetails artData={artData} userData={userData} />
          </div>
          <div className="flex justify-center items-center"><ArtReview artworkID={id}/></div>
          <div className="flex justify-center items-center"><More userData={userData} /></div>
          
        </>
      ) : (
        <Loading />
      )}
    </>
  );
}
