import React, { useState } from "react";
import { CartIcon, HeartIcon } from "../../SVG/SVG";
import PInfo from "./PInfo";
import { DisableRightClick, useCart, useSonner } from "../../constants/constants";
import { Link } from "react-router-dom";

interface ArtData {
  _id: string;
  title: string;
  category: string;
  image: string[];
  size: string;
  price: number;
}

interface ArtProps {
  artwork: ArtData;
  useStyledComponent?: boolean;
}

export default function ArtComponent({
  artwork,
  useStyledComponent,
}: ArtProps) {
  const { _id, title, size, price, image } = artwork;
  const [isImageHovered, setIsImageHovered] = useState<boolean>(false);
  const { handleAddToCart, notification } = useCart();
  DisableRightClick();

  useSonner(notification);

  const handleMouseEnter = () => {
    setIsImageHovered(true);
  };

  const handleMouseLeave = () => {
    setIsImageHovered(false);
  };

  return (
    <div
      className={`relative mr-2 overflow-hidden rounded-lg shadow-lg bg-zinc-900 
       hover: transition duration-300 ease-in-out transform hover:-translate-y-1  my-5`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        style={{ position: "relative" }}
        className={`${
          useStyledComponent
            ? ""
            : "w-44 h-44 relative rounded-xl overflow-hidden"
        }`}
      >
        <Link to={`/Art/${_id}`}>
          <img
            width={100}
            height={100}
            src={image[0]}
            alt={title}
            className={` rounded-lg ${
              useStyledComponent
                ? "w-full h-64 md:h-80 object-contain cursor-pointer"
                : "w-52 h-48 md:h-64"
            } p-4 cursor-pointer hover:shadow-xl transition duration-300`}
            style={{
              filter: isImageHovered ? "brightness(50%)" : "brightness(100%)",
            }}
          />
        </Link>

        {isImageHovered && (
          <div className="flex flex-row absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <Link to="/">
              <svg
                data-type="heart-icon"
                width="26"
                height="23"
                viewBox="0 0 23 20"
                xmlns="http://www.w3.org/2000/svg"
                className={`w-12 h-12 mr-4 text-white bg-gray-900 p-2 rounded-3xl font-bold`}
              >
                <HeartIcon />
              </svg>
            </Link>
            <button onClick={(e) => handleAddToCart(_id)} className="z-50">
              <svg
                data-type="cart-icon"
                width="22"
                height="28"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 27 21"
                className={`w-12 h-12 text-transparent bg-gray-900 p-2 rounded-3xl font-bold`}
              >
                <g fill="none" fillRule="evenodd" transform="translate(0 1)">
                  <CartIcon />
                  <circle cx="21.25" cy="17.669" r="1.635" fill="#fff"></circle>
                  <circle
                    cx="10.232"
                    cy="17.924"
                    r="1.635"
                    fill="#fff"
                  ></circle>
                </g>
              </svg>
            </button>
          </div>
        )}
      </div>
      <PInfo title={title} price={price} size={size} />
    </div>
  );
}
