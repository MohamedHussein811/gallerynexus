import React, { useState } from "react";

interface Reviews {
  profileImage: string;
  username: string;
  review: string;
  rating: number;
  updatedAt: Date;
}

export default function ReviewList({ reviews }: { reviews: Reviews[] }) {
  const [visibleReviews, setVisibleReviews] = useState<number>(3);

  const handleViewMore = () => {
    setVisibleReviews((prev) => prev + 3);
  };

  return (
    <div className="justify-center m-8 flex flex-col space-y-4">
      <h1 className="text-white font-bold text-2xl">Reviews</h1>
      {reviews.length > 0 ? (
        <>
          {reviews.slice(0, visibleReviews).map((review, index) => (
            <div
              key={index}
              className="bg-neutral-900 p-4 rounded-lg shadow-md"
            >
              <div className="flex items-center mb-2">
                <img
                  width={100}
                  height={100}
                  src={review.profileImage}
                  alt={review.username}
                  className="w-8 h-8 rounded-full mr-2"
                />
                <span className="font-semibold ">{review.username}</span>
                <span className="text-gray-400 ml-3">
                  Date: {new Date(review.updatedAt).toLocaleDateString("en-US")}
                </span>
              </div>

              <div className="mb-2 flex flex-row">
                {[...Array(5)].map((_, index) => (
                  <svg
                    key={index}
                    className={`h-4 w-4 fill-current ${
                      index < review.rating
                        ? "text-yellow-500"
                        : "text-gray-300"
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l2.75 7.55L22 9.24l-6.33 5.46L17.5 22 12 17.27 6.5 22l1.83-7.3L2 9.24l7.25.31L12 2zm0 0" />
                  </svg>
                ))}
              </div>
              <p>{review.review}</p>
            </div>
          ))}
          {visibleReviews < reviews.length && (
            <button
              onClick={handleViewMore}
              className="text-white font-semibold"
            >
              View More
            </button>
          )}
        </>
      ) : (
        <p>Nothing here</p>
      )}
    </div>
  );
}
