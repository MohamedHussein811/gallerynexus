import Axios from "axios";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

//export const api = "http://localhost:3001";
export const api = "https://api-gallerynexus.vercel.app";
export const frontendURL = "https://gallery-nexus.vercel.app";

export const useUserId = () => {
  const [UserId, setUserId] = useState<string>("");
  const [userIdInitialized, setUserIdInitialized] = useState(false);

  useEffect(() => {
    const storedUserId = window.localStorage.getItem("UserID");

    if (storedUserId) {
      setUserId(storedUserId);
      setUserIdInitialized(true);
    }
  }, []);

  return { UserId, userIdInitialized, setUserId };
};

export const useUserName = () => {
  const [myUsername, setUsername] = useState<string>("");
  const [myProfileImage, setprofileImage] = useState<string>("");
  const [cookies] = useCookies(["access_token"]);

  useEffect(() => {
    const getUser = async () => {
      const storedUserId = window.localStorage.getItem("UserID");
      if (storedUserId) {
        try {
          const res = await Axios.get(`${api}/getuser/${storedUserId}`, {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${cookies.access_token}`,
            },
          });
          setUsername(res.data.username);
          setprofileImage(res.data.profileImage);
        } catch (error) {
          console.error("Error fetching user:", error);
          // Clear local storage and cookies
        }
      }
    };

    getUser();
  }, [cookies.access_token]);

  return { myUsername, myProfileImage };
};

export const useUser = () => {
  const [UserID, setId] = useState<string>("");

  const [myUsername, setUsername] = useState<string>("");
  const [myProfileImage, setprofileImage] = useState<string>("");
  const [isArtist, setisArtist] = useState<boolean>(false);
  const [cookies] = useCookies(["access_token"]);
  const [isAdmin, setisAdmin] = useState<boolean>(false);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await Axios.get(`${api}/getuser`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${cookies.access_token}`,
          },
        });
        setUsername(res.data.username);
        setprofileImage(res.data.profileImage);
        setisArtist(res.data.isArtist);
        setisAdmin(res.data.isAdmin);
        setId(res.data._id);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    getUser();
  }, [cookies.access_token]);

  return {
    myUsername,
    myProfileImage,
    UserID,
    setId,
    isAdmin,
    setisArtist,
    isArtist,
  };
};

export const useCart = () => {
  const [notification, setNotification] = useState<{
    message: string;
    status: number;
  } | null>(null);
  const { UserID } = useUser();
  const [cookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const NotLoggedIn = () => {
    toast(`You're not Logged in.`, {
      action: {
        label: `Log in`,
        onClick: () => navigate("/Auth"),
      },
    });
  };

  const handleAddToCart = async (ArtID: any) => {
    if (UserID) {
      try {
        const res = await Axios.post(
          `${api}/addtocart`,
          { UserID, ArtID },
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${cookies.access_token}`,
            },
          }
        );
        setNotification({ message: res.data.message, status: res.status });
      } catch (error) {
        console.error("Error occurred:", error);
      }
    } else {
      NotLoggedIn();
    }
  };

  return { handleAddToCart, notification };
};

export function useSonner(notification: any) {
  const [toastDisplayed, setToastDisplayed] = useState<boolean>(false);

  useEffect(() => {
    if (!toastDisplayed && notification) {
      setToastDisplayed(true);
      const timestamp = new Date().toLocaleString();
      toast(notification.message, {
        description: timestamp,
        action: {
          label: "Close",
          onClick: () => console.log("Close"),
        },
      });
    }
  }, [toastDisplayed, notification]);

  return null;
}

export function DisableRightClick() {
  useEffect(() => {
    function handleContextMenu(event: { preventDefault: () => void }) {
      event.preventDefault(); // Prevent default right-click behavior
    }

    // Add event listener when component mounts
    window.addEventListener("contextmenu", handleContextMenu);

    // Remove event listener when component unmounts
    return () => {
      window.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);
}

export const DisplaySonner = (notification: any) => {
  if (notification) {
    const timestamp = new Date().toLocaleString();
    toast(notification, {
      description: timestamp,
      action: {
        label: "Close",
        onClick: () => console.log("Close"),
      },
    });
  }
};
