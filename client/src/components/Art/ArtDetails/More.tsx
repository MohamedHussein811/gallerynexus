import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function More({ userData }: any) {
  const [randomArtworks, setRandomArtworks] = useState<any[]>([]);

  useEffect(() => {
    const shuffleArray = (array: any[]) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    };

    const shuffledArtworks = shuffleArray(userData.allArtworks);
    const randomSelection = shuffledArtworks.slice(0, 6);
    setRandomArtworks(randomSelection);
  }, [userData.allArtworks]);

  return (
    <div className="mt-8 p-3 ">
      <h3 className="text-xl font-semibold text-white mb-4">
        More from {userData.userName}
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {randomArtworks.map((artwork: any, index: number) => (
          <Link
            to={`/Art/${artwork._id}`}
            key={index}
            className="flex flex-col items-center justify-center p-4 rounded-lg bg-zinc-900 hover:bg-zinc-950 transition-colors duration-300"
          >
            <div className="w-44 h-44 relative rounded-lg overflow-hidden">
              <img
              width={100}
              height={100}
                src={artwork.image[0]}
                alt={artwork.title}
                className="w-44 h-44"
              />
            </div>
            <p className="text-white text-lg text-center mt-2">{artwork.title}</p>
            <span className="text-gray-500 text-center text-xs">{artwork.size}</span>
            <p className="text-white text-center ">{artwork.category}</p>
            <p className="text-white text-center ">${parseFloat(artwork.price).toFixed(2)}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
