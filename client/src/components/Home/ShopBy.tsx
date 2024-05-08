import { Link } from "react-router-dom";

export default function ShopBy({ Type }: any) {
  let menuItems: string | any[] = [];

  if (Type === "Price") {
    menuItems = [
      { href: "/Artworks/All", label: "Any"},
      { href: "/Artworks/All?price=0-500", label: "Under $500" },
      { href: "/Artworks/All?price=500-1000", label: "$500 - $1000" },
      { href: "/Artworks/All?price=1000-2000", label: "$1000 - $2000" },
      { href: "/Artworks/All?price=2000-5000", label: "$2000 - $5000" },
      { href: "/Artworks/All?price=5000-1000000", label: "above $5000" },

    ];
  } else if (Type === "Category") {
    menuItems = [
      { href: "/Artworks/Paintings", label: "Paintings" },
      { href: "/Artworks/Photography", label: "Photography" },
      { href: "/Artworks/Drawings", label: "Drawings" },
      { href: "/Artworks/Sculpture", label: "Sculpture" },
      { href: "/Artworks/Mixed Media", label: "Mixed Media" },
      { href: "/Artworks/Prints", label: "Prints" },

    ];
    const shuffleArray = (array: any[]) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    };
    menuItems = shuffleArray([...menuItems]);
  }

  const randomItems = menuItems.slice(0, 6);

  return (
    <>
      {menuItems.length > 0 && (
        <div className="">
          <h1
            className="mx-5 my-3 font-bold text-3xl sm:text-4xl text-gray-100"
            style={{ fontFamily: "Crimson Text, serif" }}
            >
            Shop By {Type}
          </h1>{" "}
          <div className="justify-center flex flex-col sm:flex-row items-center m-4 p-4 ">
            <div className="flex flex-wrap justify-center text-center sm:justify-start">
              <div className="grid grid-cols-2 sm:grid-cols-6 gap-4">
                {randomItems.map((item: any, index: number) => (
                  <Link
                    key={index}
                    to={item.href}
                    className="text-gray-200  rounded-lg  font-bold hover:opacity-50 transition duration-300 border-solid border-gray-200 border-2 py-3 px-6 text-center sm:py-4 sm:px-6"
                    style={{
                      fontSize: "1rem",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
