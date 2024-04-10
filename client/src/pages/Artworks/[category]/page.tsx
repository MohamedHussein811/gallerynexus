import { useEffect, useState, useMemo } from "react";
import Filters from "../../../components/Art/Filters/Filters";
import Loading from "../../../components/Loading/Loading";
import NotFound from "../../../not-found";
import { api } from "../../../constants/constants";
import queryString from "query-string";
import axios from "axios";
import { useParams } from "react-router-dom";
import ArtworkItem from "../../../components/Art/ArtworkItem/ArtworkItem";

interface ArtData {
  _id: string;
  title: string;
  category: string;
  image: string[];
  size: string;
  price: number;
}

export default function Artworks() {
  const { category } = useParams();
  const [artData, setArtData] = useState<ArtData[] | null>(null);
  const [priceRange, setPriceRange] = useState<string | null>(null);
  const [searchQueryParam, setSearchQueryParam] = useState<string>("");
  const [rerender, setRerender] = useState(false);

  // Memoize the searchParams object creation
  const searchParams = useMemo(() => new URLSearchParams(window.location.search), [window.location.search]);

  useEffect(() => {
    setSearchQueryParam(searchParams.get("search") || "");
  }, [searchParams]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const queryParams = queryString.parse(window.location.search);
        const searchQuery = queryParams.search as string;
        const priceQuery = queryParams.price as string;

        let url = `${api}/getartworkbycategory/${category}`;

        if (priceRange) {
          url += `${priceRange}`;
        } else if (priceQuery) {
          url += `?price=${priceQuery}`;
        }

        const response = await axios.get(url);
        let filteredArtworks = response.data.artworks;

        if (searchQuery) {
          filteredArtworks = filteredArtworks.filter(
            (artwork: ArtData) =>
              artwork.title.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }
        setArtData(filteredArtworks);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (category || rerender) {
      fetchData();
    }
  }, [category, priceRange, searchParams,rerender]);
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-8">
        <Filters setPriceRange={setPriceRange} />
        <div className="col-span-3 md:col-span-3 lg:col-span-3">
        {searchQueryParam && <p>Search result for &apos;{searchQueryParam}&apos;</p>}

          {artData ? (
            artData.length > 0 ? (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 mr-3 ">
                {artData.map((artwork) => (
                  <ArtworkItem
                  key={artwork._id}
                  artwork={artwork}
                  setRerender={setRerender}
                />
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


