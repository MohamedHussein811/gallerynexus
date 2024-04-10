import React, { useState, useEffect, useCallback } from "react";
import Axios from "axios";
import { api, useUser } from "../../constants/constants";
import ReviewList from "./ReviewList";
import AddReview from "./AddReview";
import { Link } from "react-router-dom";

interface Reviews {
  profileImage: string;
  username: string;
  review: string;
  rating: number;
  updatedAt: Date;
}

interface ArtReviewProps {
  artworkID: any;
}

const ArtReview: React.FC<ArtReviewProps> = ({ artworkID }) => {
  const [reviews, setReviews] = useState<Reviews[]>([]);
  const { UserID } = useUser();

  const fetchData = useCallback(async () => {
    try {
      const res = await Axios.get(`${api}/getartworkreviews/${artworkID}`);
      setReviews(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [artworkID]);

  useEffect(() => {
    if (artworkID) {
      fetchData();
    }
  }, [artworkID, fetchData]);

  return (
    <div className="flex flex-col w-full">
      <ReviewList reviews={reviews} />
      {UserID ? (
        <AddReview artworkID={artworkID} fetchData={fetchData} />
      ) : (
        <div className="bg-neutral-800 m-8 rounded-lg p-3">
          <p className="text-white pb-2">You are not logged in to submit a review.</p>
          <Link to={"/Auth"} className="text-white bg-neutral-600 transition-all  p-2 rounded-xl hover:bg-neutral-700" >Login </Link>
        </div>
      )}
    </div>
  );
};

export default ArtReview;
