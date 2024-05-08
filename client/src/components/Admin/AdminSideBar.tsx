import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUser,
  faClipboardList,
  faVideo,
  faImage,
  faUsers,
  faBriefcase,
  faShoppingCart,
  faPuzzlePiece,
  faCog,
  faSignOutAlt,
  faBars,
} from "@fortawesome/free-solid-svg-icons";

export default function AdminSideBar() {
  const links = [
    { to: "/", icon: faHome, text: "Dashboard" },
    { to: "/", icon: faUser, text: "Users" },
    { to: "/", icon: faShoppingCart, text: "Products" },
    { to: "/", icon: faPuzzlePiece, text: "Services" },
    { to: "/", icon: faCog, text: "Settings" },
  ];
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="">
      <div className={`lg:block ${sidebarOpen ? "block" : "hidden"}`}>
        <div className="bg-white border-l-2 border-gray-200 h-full w-64 flex flex-col fixed top-0 right-0 transition-transform transform duration-300 ease-in-out">
          <div className="h-16 flex items-center justify-center">
            <h1 className="text-black text-lg font-semibold">Admin Panel</h1>
          </div>
          <div className="flex-grow p-4">
            <nav className="space-y-4">
              {links.map((link, index) => (
                <Link
                  key={index}
                  to={link.to}
                  className="text-gray-600 flex items-center px-4 py-2 rounded-md hover:bg-gray-200"
                  onClick={closeSidebar}
                >
                  <FontAwesomeIcon icon={link.icon} className="w-6 h-6 mr-2" />
                  {link.text}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Hamburger Menu for Small Screens */}
      <div className="lg:hidden">
        <div className="h-full w-16 flex flex-col fixed top-0 right-0">
          <div className="h-16 flex items-center justify-center">
            <FontAwesomeIcon
              icon={faBars}
              className={` ${
                sidebarOpen ? "text-black" : "text-black"
              }  text-lg cursor-pointer`}
              onClick={toggleSidebar}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
