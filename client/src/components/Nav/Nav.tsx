import { useState, useRef, useEffect } from "react";
import NavHeader from "./NavHeader";
import { NavMenuClose, NavMenuOpen } from "../../SVG/SVG";
import "./Nav.css";
import { RenderMenuLinks } from "./renderMenuLinks";
import Logo from "./Logo";
import { Provider } from "react-redux";
import store from "../../pages/redux/store";

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isBelowXL, setIsBelowXL] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prevMenuOpen) => !prevMenuOpen);
  };

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsBelowXL(window.innerWidth < 1280);
      if (!isBelowXL) {
        setMenuOpen(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isBelowXL]);

  useEffect(() => {
    const isMenuHidden = (element: any) => {
      let currentElement = element;
      while (currentElement) {
        if (currentElement.classList.contains("md:hidden")) {
          return true;
        }
        currentElement = currentElement.parentElement;
      }
      return false;
    };

    const handleClickOutside = (event: any) => {
      const screenWidth = window.innerWidth;
      const clickX = event.clientX;
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        !isMenuHidden(event.target) &&
        clickX < screenWidth / 4
      ) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <>
      <div className="z-50 bg-neutral-900">
      <Provider store={store}>

        <NavHeader />
        </Provider>

        <div className="py-3 sm:p-3">
          <div className="flex justify-between items-center">
            <Logo />

            <div className="hidden xl:flex justify-center space-x-4 text-black flex-grow font-semibold">
              <RenderMenuLinks menuOpen={menuOpen} toggleMenu={toggleMenu} />
            </div>

            <div className="xl:hidden text-black" ref={menuRef}>
              <button onClick={toggleMenu}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="#fff"
                >
                  {menuOpen ? <NavMenuOpen /> : <NavMenuClose />}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Backdrop */}
      {menuOpen && (
        <div className="fixed inset-0 bg-neutral-900 bg-opacity-50 z-40"></div>
      )}

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className={`slide-in bg-black text-white h-full fixed top-0 right-0 z-50 xl:hidden space-y-4 mt-4  w-full`}
        >
          <RenderMenuLinks menuOpen={menuOpen} toggleMenu={toggleMenu} />
        </div>
      )}
    </>
  );
}
