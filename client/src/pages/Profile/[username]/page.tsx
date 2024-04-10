import { DisableRightClick, api } from "../../../constants/constants";
import Axios from "axios";
import { useEffect, useState } from "react";

import NotFound from "../../../not-found";
import Loading from "../../../components/Loading/Loading";
import ProfileHeader from "../../../components/Profile/ProfileHeader";
import ArtworkItem from "../../../components/Profile/ArtworkItem";
import { useParams } from "react-router-dom";

interface ArtData {
  _id: string;
  title: string;
  category: string;
  image: string[];
  size: string;
  price: number;
}

interface UserData {
  _id: string;
  username: string;
  email: string;
  isArtist: boolean;
  artworks: ArtData[];
  profileImage: string;
  bio: string;
}

export default function Profile() {
  const { username } = useParams();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [userNotFound, setUserNotFound] = useState(false);
  const [rerender, setRerender] = useState(false);
  DisableRightClick();

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await Axios.get<UserData>(
          `${api}/getuserbyusername/${username}`
        );
        if (res.status === 200) {
          setUserData(res.data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUserNotFound(true);
      }
    };
    if (username || rerender) {
      getUser();
      setRerender(false);
    }
  }, [username, rerender]);

  if (userNotFound) {
    return <NotFound />;
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-5xl mx-auto px-4">
        {userData ? (
          <div>
            <ProfileHeader userData={userData} />
            {userData.isArtist ? (
              <>
                {userData.artworks?.length > 0 ? (
                  <div className="mt-8">
                    <h2 className="text-xl font-bold mb-4">Artworks</h2>

                    <ul className="grid grid-cols-2 md:grid-cols-4 gap-8">
                      {userData.artworks.map((artwork) => (
                        <ArtworkItem
                          key={artwork._id}
                          artwork={artwork}
                          userData={userData}
                          setRerender={setRerender}
                        />
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div className="mt-8">
                    <p className="text-xl">There are no artworks.</p>
                  </div>
                )}
              </>
            ) : (
              <div className="mt-8">
                <p className="text-xl">This user is not an artist.</p>
              </div>
            )}
          </div>
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
}
