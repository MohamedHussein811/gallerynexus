import { api } from "../../../constants/constants";
import  Axios  from "axios";
import { useState } from "react";
import { useCookies } from "react-cookie";

export default function AddReview({ artworkID, fetchData }: { artworkID: any; fetchData: () => void }) {
    const [rating, setRating] = useState(1);
    const [review, setReview] = useState<string>("");
    const [cookies] = useCookies(["access_token"]);
  
    const handleRatingChange = (value: number) => {
      setRating(value);
    };
  
    const handleAddReview = async () => {
      const res = await Axios.post(
        `${api}/addreview`,
        { artworkID, rating, review },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${cookies.access_token}`,
          },
        }
      );
      setReview("");
      setRating(1);
      if (res.status === 200) {
        fetchData();
      }
    };
  
    return (
      <div className="p-6 m-8 bg-neutral-900 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Leave a Review</h2>
        <div className="flex items-center mb-4">
          <span className="mr-2">Your Rating:</span>
          {[...Array(5)].map((_, index) => (
            <svg
              key={index}
              className={`h-6 w-6 fill-current ${
                index < rating ? "text-yellow-500" : "text-gray-300"
              }`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              onClick={() => handleRatingChange(index + 1)}
            >
              <path d="M12 2l2.75 7.55L22 9.24l-6.33 5.46L17.5 22 12 17.27 6.5 22l1.83-7.3L2 9.24l7.25.31L12 2zm0 0" />
            </svg>
          ))}
        </div>
        <div className="mb-4">
          <textarea
            className="w-full px-3 py-2 border border-neutral-500 rounded-md bg-neutral-800 text-white focus:outline-none focus:ring focus:border-neutral-300"
            rows={5}
            placeholder="Write your review here..."
            onChange={(e) => setReview(e.target.value)}
            value={review}
          ></textarea>
        </div>
        <button
          onClick={handleAddReview}
          className="px-4 py-2 bg-neutral-700 transition-all text-white rounded-md hover:bg-neutral-800 focus:outline-none focus:bg-neutral-800"
        >
          Submit Review
        </button>
      </div>
    );
  };