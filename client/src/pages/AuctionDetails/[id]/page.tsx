import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../../../components/Loading/Loading";
import { api } from "../../../constants/constants";
import NotFound from "../../../not-found";
import ArtImage from "../../../components/Art/ArtDetails/ArtImage";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";

interface ArtData {
  title: string;
  category: string;
  image: string[];
  size: string;
  price: string;
  date: Date;
  enddate: Date;
}
interface lastone {
  username: string;
  profileImage: string;
}
interface userData {
  userId: string;
  userName: string;
  ArtData: ArtData;
}

export default function AuctionDetails() {
  const { id } = useParams();
  const [artData, setArtData] = useState<ArtData | null>(null);

  const [userData, setUserData] = useState<userData | null>(null);

  const [notFound, setNotFound] = useState<boolean>(false);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [newPrice, setNewPrice] = useState<number>(0);
  const [error, setError] = useState<string>("");
  const [lastone, setLastOne] = useState<lastone | null>(null);
  const [cookies] = useCookies(["access_token"]);
  const [trigger, setTrigger] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${api}/getauctionbyid/${id}`);
        if (response.data.auction) {
          setArtData(response.data.auction);
          setUserData(response.data);
          setNewPrice(response.data.auction.price);
          setLastOne(response.data.lastoneDetails);
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
  }, [id, trigger]);

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
  const handleNewPrice = async () => {
    try {
      const response = await axios.post(
        `${api}/updateauctionprice`,
        {
          auctionId: id,
          newPrice: newPrice,
        },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${cookies.access_token}`,
          },
        }
      );
      setError(response.data.message);
      setTrigger(!trigger);
    } catch (error) {
      console.error("Error updating price:", error);
      setError("Error updating price.");
    }
  };

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
            <div className="w-full sm:w-1/2 flex flex-col justify-center bg-zinc-900 p-5">
              <h2 className="text-3xl font-bold">{artData.title}</h2>
              <p className="text-lg mb-2 text-red-600">
                <span className="text-white">Artist:</span> {userData?.userName}
              </p>
              <p className="text-lg mb-2">{artData.category}</p>
              <p className="text-lg mb-2">Size: {artData.size}</p>
              <p className="text-lg mb-2">
                Starting Date: {new Date(artData.date).toLocaleDateString()}
              </p>
              <p className="text-lg mb-2">
                End Date: {new Date(artData.enddate).toLocaleDateString()}
              </p>

              {lastone && (
                <div className="flex items-center mt-2 py-2">
                  <div className="flex flex-col">
                    <p>Last one:</p>{" "}
                    <div className="flex flex-row">
                      <img
                        src={lastone.profileImage}
                        alt={lastone.username}
                        width={30}
                        height={30}
                        className="rounded-full"
                      />
                      <p className="text-gray-100 ml-2">{lastone.username}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="bg-zinc-700 p-4">
                {" "}
                <p className="text-3xl">
                  Current Price:
                  <span className="text-3xl mb-4 text-red-500 mx-2">
                    ${parseFloat(artData.price).toFixed(2)}
                  </span>
                  <span className="text-xl text-gray-200">USD</span>
                </p>
              </div>
              <input
                type="number"
                placeholder="Enter your new Price"
                className="bg-black text-white p-3 text-3xl m-4 rounded-lg"
                value={newPrice}
                onChange={(e) => {
                  const inputPrice = parseFloat(e.target.value);
                  if (inputPrice >= parseFloat(artData?.price)) {
                    setNewPrice(inputPrice);
                    setError("");
                  } else {
                    setNewPrice(inputPrice);

                    setError(
                      `New price must be greater than ${artData?.price}.`
                    );
                  }
                }}
              />
              <button
                className={` text-white px-6 py-3 rounded-lg shadow-md transition duration-300 ease-in-out transform  ${
                  newPrice.toString() === artData.price.toString()
                    ? `bg-red-500`
                    : `bg-blue-500 hover:bg-blue-700 hover:scale-105`
                }`}
                disabled={newPrice.toString() <= artData.price.toString()}
                onClick={handleNewPrice}
              >
                Submit
              </button>
              {error && <p className="my-2 text-red-700">{error}</p>}
            </div>
          </div>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
}
