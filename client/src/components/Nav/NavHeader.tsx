import { CartIcon, HeartIcon, ProfileIcon } from "../../SVG/SVG";
import { useUser } from "../../constants/constants";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";

export default function NavHeader() {
  const { myUsername, UserID, setId, isArtist, setisArtist } = useUser();
  const [cookies, , removeCookie] = useCookies(["access_token"]);
  const navigate = useNavigate();
  useEffect(() => {
    const checkAccessToken = async () => {
      if (cookies.access_token || UserID) {
        const userIdFromStorage = window.localStorage.getItem("UserID");
        setId(userIdFromStorage ? userIdFromStorage : UserID || "");
      }
    };

    checkAccessToken();
  }, [cookies.access_token, UserID, isArtist, setId]);

  const Logout = () => {
    removeCookie("access_token");
    window.localStorage.removeItem("UserID");
    setId("");
    setisArtist(false);
    navigate("/Auth");
  };
  if (!cookies["access_token"] && UserID) {
    window.localStorage.removeItem("UserID");
  }
  return (
    <div className="flex justify-end bg-neutral-900">
      <div className="flex items-center text-white pr-3">
        {isArtist && (
          <>
            <Link
              to="/AddArtworkForm"
              className="transition duration-300 hover:text-zinc-500"
            >
              Add Artwork
            </Link>
            <span className="mx-2">|</span>
            <Link
              to="/Addauction"
              className="transition duration-300 hover:text-zinc-500"
            >
              Add auction
            </Link>
            <span className="mx-2">|</span>
          </>
        )}

        {!UserID ? (
          <>
            <Link
              to={"/Auth"}
              className="transition duration-300 hover:text-zinc-500"
            >
              Login
            </Link>
            <span className="mx-2">|</span>
            <Link
              to={"/Auth"}
              className="transition duration-300 hover:text-zinc-500"
            >
              Register
            </Link>
          </>
        ) : (
          <>
            
            <button
              className="px-2 transition duration-300 hover:text-zinc-500"
              onClick={Logout}
            >
              Sign out
            </button>

            <Link
              to={`/Profile/${myUsername}`}
              className="transition duration-300 hover:text-zinc-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <ProfileIcon />
              </svg>
            </Link>
          </>
        )}
        <div className="p-3 flex flex-row">
          <Link to="/">
            <svg
              data-type="heart-icon"
              width="25"
              height="25"
              viewBox="0 0 23 20"
              xmlns="http://www.w3.org/2000/svg"
              fill="#ff0"
              className="text-red-500"
            >
              <HeartIcon />
            </svg>
          </Link>
        </div>
        <div>
          <Link to="/Cart">
            <svg
              data-type="cart-icon"
              width="25"
              height="25"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 27 21"
            >
              <g fill="none" fillRule="evenodd" transform="translate(0 1)">
                <CartIcon />

                <circle cx="21.25" cy="17.669" r="1.635" fill="#fff"></circle>
                <circle cx="10.232" cy="17.924" r="1.635" fill="#fff"></circle>
              </g>
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
