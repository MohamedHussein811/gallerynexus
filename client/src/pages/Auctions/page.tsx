import { useEffect, useState } from "react";
import Loading from "../../components/Loading/Loading";
import NotFound from "../../not-found";
import { api } from "../../constants/constants";
import axios from "axios";
import { useCookies } from "react-cookie";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../components/ui/carousel";
import { Link } from "react-router-dom";
import PInfo from "../../components/Art/ArtDetails/PInfo";

interface ArtData {
  lastone: string;
  lastoneProfileImage: string;
  _id: string;
  title: string;
  category: string;
  image: string[];
  size: string;
  price: number;
  date: Date;
  enddate: Date;
}

export default function Auctions() {
  const [artData, setArtData] = useState<ArtData[] | null>(null);
  const [cookies] = useCookies(["access_token"]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${api}/getallauctions`);
        let filteredArtworks = response.data.auctions;
        console.log(response.data.auctions);

        setArtData(filteredArtworks);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-8 mx-2">
        <div className="col-span-3 md:col-span-3 lg:col-span-3">
          {artData ? (
            artData.length > 0 ? (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 ">
                {artData.map((artwork, index) => (
                  <div
                    className={`relative mr-2 overflow-hidden rounded-lg shadow-lg bg-zinc-900 
     hover: transition duration-300 ease-in-out transform hover:-translate-y-1  my-5`}
                    key={index}
                  >
                    <div
                      className={`" relative rounded-xl overflow-hidden"
                      }`}
                    >
                      <Link to={`/Art/`}>
                        <Carousel
                          opts={{
                            align: "start",
                            loop: true,
                          }}
                          className="m-4"
                        >
                          <CarouselContent>
                            {artwork.image.map(
                              (image: any, imgIndex: number) => (
                                <CarouselItem key={imgIndex}>
                                  <Link
                                    to={`/AuctionDetails/${artwork._id}`}
                                    key={imgIndex}
                                  >
                                    <img
                                      width={300}
                                      height={300}
                                      src={image}
                                      alt={`Artwork ${imgIndex + 1}`}
                                      className="w-full object-cover rounded-lg"
                                    />
                                  </Link>
                                </CarouselItem>
                              )
                            )}
                          </CarouselContent>
                          {artwork.image?.length > 1 && (
                            <>
                              <CarouselPrevious className="bg-gray-900 bg-opacity-50 hover:bg-opacity-75 text-white absolute top-1/2 transform -translate-y-1/2 left-2 rounded-full p-2" />
                              <CarouselNext className="bg-gray-900 bg-opacity-50 hover:bg-opacity-75 text-white absolute top-1/2 transform -translate-y-1/2 right-2 rounded-full p-2" />
                            </>
                          )}
                        </Carousel>
                      </Link>
                    </div>
                    <PInfo
                      title={artwork.title}
                      price={artwork.price}
                      size={artwork.size}
                    />
                    <div className="p-4">
                      <p className="text-lg text-gray-100">
                        Starting Date:{" "}
                        {new Date(artwork.date).toLocaleDateString()}
                      </p>
                      <p className="text-lg text-gray-100">
                        Ending Date:{" "}
                        {new Date(artwork.enddate).toLocaleDateString()}
                      </p>
                      <div className="flex items-center mt-2">
                        <div className="flex flex-col">
                          <p>Last one:</p>{" "}
                          <div className="flex flex-row">
                            <img
                              src={artwork.lastoneProfileImage}
                              alt={artwork.lastone}
                              width={30}
                              height={30}
                              className="rounded-full"
                            />
                            <p className="text-gray-100 ml-2">
                              {artwork.lastone}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <NotFound />
            )
          ) : (
            <Loading />
          )}
        </div>
      </div>
    </>
  );
}
