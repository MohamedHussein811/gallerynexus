import React from "react";
import { Flower } from "../../SVG/SVG";

const ProfileHeader = ({ userData }:any) => {
  return (
    <div>
      <div className="flex items-center justify-center">
        <img
          src={userData.profileImage}
          width={100}
          height={100}
          alt="ProfileImg"
          className="rounded-full"
        />
      </div>
      <h1 className="text-3xl font-bold text-center mt-4 flex flex-row justify-center items-center">
        {userData.username}
        {userData.isArtist && (
          <>
            {" "}
            <p> </p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 461 455"
              className="h-6 w-6 rotating-svg"
            >
              <Flower />
            </svg>
          </>
        )}
      </h1>
      <div className="flex flex-col justify-start items-start bg-zinc-800 p-4 my-4 rounded-lg ">
        <p className="text-center text-gray-100 mt-2">Email: {userData.email}</p>
        <p className="text-center text-gray-100 mt-2">Bio: {userData.bio.length < 1 ? "None" : userData.bio}</p>
        <p className="text-center text-gray-100 mt-2">
          Artist: {userData.isArtist ? "Yes" : "No"}
        </p>
      </div>
    </div>
  );
};

export default ProfileHeader;
