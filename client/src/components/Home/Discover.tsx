
import React from "react";
import "./Discover.css";
import { Link } from "react-router-dom";
const artworks = [
  {
    id: 1,
    image: "/assets/Discover/Emerge.jpg",
    title: "Emerge | Now on View",
    link: "/",
  },
  {
    id: 2,
    image: "/assets/Discover/Kate.jpg",
    title: "Second Acts by Kate Arends",
    link: "/",
  },
  {
    id: 3,
    image: "/assets/Discover/24Artist.jpg",
    title: "24 Artists to Collect in 2024",
    link: "/",
  },
];

function getRandomArtworks(numItems = 3) {
  const shuffled = artworks.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, numItems);
}

const Discover = () => {
  const randomArtworks = getRandomArtworks();

  return (
    <div className="flex justify-center items-center">
      <div className="mx-auto px-4 overflow-x-auto max-w-screen-md">
        <div className="flex justify-center items-center my-5">
          <p
            className="p-3 text-center text-gray-200 max-w-md text-2xl sm:text-4xl"
            style={{ fontFamily: "Crimson Text, serif" }}
          >
            Discover Art You Love From the World&apos;s Leading Online Gallery
          </p>
        </div>
        <div className="flex flex-row gap-4 justify-center items-center overflow-hidden">
          {randomArtworks.map((artwork) => (
            <div
              key={artwork.id}
              className="rounded-md overflow-hidden shadow-md hover:shadow-lg transition duration-300 max-h-80 transform hover:scale-105"
            >
              <Link to={artwork.link}>
                <div className="relative">
                  <img
                    width={600}
                    height={400}
                    className="object-cover"
                    src={artwork.image}
                    alt={artwork.title}
                  />
                </div>
              </Link>
              <div className="px-4 py-2">
                <Link
                  to={artwork.link}
                  className="text-lg font-semibold hover:text-blue-500"
                >
                  {artwork.title}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Discover;
