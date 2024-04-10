import { NavMenuOpen } from "../../../SVG/SVG";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../../ui/navigation-menu";
import { Search } from "lucide-react";
import React, { useState } from "react";
import { menuItems } from "./menuItems";
import { UrlObject } from "url";
import { cn } from "../../ui/lib/utils";
import { Link, useNavigate } from "react-router-dom";

export function RenderMenuLinks({ menuOpen, toggleMenu }: any) {
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  const handleSearchSubmit = () => {
    navigate(`/Artworks/All?search=${searchValue}`);
    //setSearchValue("");
  };

  return (
    <>
      {menuOpen && (
        <button onClick={toggleMenu}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="#fff"
          >
            <NavMenuOpen />
          </svg>
        </button>
      )}

      <NavigationMenu>
        <NavigationMenuList
          className={menuOpen ? "flex flex-col justify-start items-start" : ""}
        >
          {Object.entries(menuItems).map(([category, items]) => (
            <NavigationMenuItem key={category}>
              <NavigationMenuTrigger
                className={
                  menuOpen
                    ? "text-white my-6 bg-black"
                    : "bg-neutral-900 text-white"
                }
              >
                {category}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul
                  className={`bg-zinc-900 text-white grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ${
                    menuOpen ? "fixed top-9" : ""
                  }`}
                >
                  {items.main.map((item) => (
                    <Link key={item.title} to={item.href}>
                      <ListItem
                        title={item.title}
                        description={item.description}
                      />
                    </Link>
                  ))}
                  {items.Subject.length > 0 && (
                    <SubMenuList title="Subjects" items={items.Subject} />
                  )}
                  {items.Style.length > 0 && (
                    <SubMenuList title="Styles" items={items.Style} />
                  )}
                  {items.Medium.length > 0 && (
                    <SubMenuList title="Medium" items={items.Medium} />
                  )}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>

      <div className="flex items-center px-5">
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="rounded-l-lg p-3 border-t border-b border-l text-white border-neutral-700 bg-neutral-900"
          />
          <button
            type="submit"
            className="p-3 rounded-l-lg text-white bg-blue-800"
            style={{ position: "absolute", top: 0, right: 0, bottom: 0 }}
            onClick={() => {
              handleSearchSubmit();
            }}
          >
            <Search />
          </button>
        </div>
      </div>
    </>
  );
}

const SubMenuList = ({ title, items }: any) => (
  <li className="flex flex-col px-4">
    <h2>{title}</h2>
    {items.map(
      (
        item: { href: string | UrlObject; title: any; description: any },
        index: React.Key | null | undefined
      ) => (
        <Link key={index} to={typeof item.href === 'string' ? item.href : '/'}>
          <ListItem title={item.title} description={item.description} />
        </Link>
      )
    )}
  </li>
);

const ListItem = ({ title, description }: any) => (
  <NavigationMenuLink asChild>
    <div
      className={cn(
        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
      )}
    >
      <div className="text-sm font-medium leading-none">{title}</div>
      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
        {description}
      </p>
    </div>
  </NavigationMenuLink>
);
