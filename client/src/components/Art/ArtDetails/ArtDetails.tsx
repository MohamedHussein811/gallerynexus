import { ArtInfo } from "./ArtInfo";
import { useCart, useSonner} from "../../../constants/constants";
import { Link } from "react-router-dom";


export default function ArtDetails({ artData, userData }: any) {
  const { handleAddToCart, notification } = useCart();

  useSonner(notification);

  return (
    <>
      <div className="w-full sm:w-1/2 flex flex-col justify-center bg-zinc-900 p-5">
        <h2 className="text-3xl font-bold">{artData.title}</h2>
        <p className="text-lg mb-2 text-red-600">
          <span className="text-white">Artist:</span> {userData.userName}
        </p>
        <p className="text-lg mb-2">{artData.category}</p>
        <p className="text-lg mb-2">Size: {artData.size}</p>
        <div className="bg-zinc-700 p-4">
          {" "}
          <p className="text-3xl mb-4">
            ${parseFloat(artData.price).toFixed(2)} <span className="text-xl text-gray-200">USD</span>
          </p>
          <button
            onClick={(e) => handleAddToCart(artData._id)}
            className="bg-orange-700 hover:bg-orange-600 text-white px-6 py-3 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
          >
            Add to Cart
          </button>
        </div>
        <ArtInfo Info={"Shipping included"} />
        <ArtInfo Info={"14-day satisfaction guarantee"} />
        <Link
          to={`/Artworks/${artData.category}`}
          className="text-black font-semibold"
        >
          <div className="flex justify-center items-center rounded-lg bg-white p-3 transition duration-300 ease-in-out transform hover:scale-105 mt-4">
            <img
              src={"/assets/Tools/explore.png"}
              width={20}
              height={20}
              alt="explore"
            />
            <p className="px-2">See More Like this</p>
          </div>
        </Link>
      </div>
    </>
  );
}
