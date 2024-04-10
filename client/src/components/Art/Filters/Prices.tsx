import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { Link } from "react-router-dom";

export default function Prices({ setPriceRange }: any) {
  const [searchParams, setSearchParams] = useState("");
  const [stylesParams, setStylesParams] = useState<string[]>([]);

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const styles = urlSearchParams.getAll("style");
    setSearchParams(urlSearchParams.toString());
    setStylesParams(styles);
  }, []);

  const generatePriceHref = (priceRange: string) => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    urlSearchParams.set("price", priceRange);
    // Check if 'style' parameter is already present, if so, remove it
    if (urlSearchParams.has("style")) {
      urlSearchParams.delete("style");
    }
    // Append stylesParams if not empty
    if (stylesParams.length > 0) {
      stylesParams.forEach((style) => {
        urlSearchParams.append("style", style);
      });
    }
    const queryString = urlSearchParams.toString();
    return `?${queryString}`;
  };

  const prices = [
    { href: generatePriceHref("0-500"), label: "Under $500" },
    { href: generatePriceHref("500-1000"), label: "$500 - $1000" },
    { href: generatePriceHref("1000-2000"), label: "$1000 - $2000" },
    { href: generatePriceHref("2000-5000"), label: "$2000 - $5000" },
  ];

  const handlePriceChange = (priceRange: string) => {
    setPriceRange(priceRange);
  };

  return (
    <DropdownMenu>
      <label htmlFor="price" className="text-sm font-semibold mb-2 block">
        Prices
      </label>
      <DropdownMenuTrigger className="mb-4 w-full p-2 border border-gray-500 rounded-md text-left">
        Select Price Range
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Select Price Range</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {prices.map((price, index) => (
          <DropdownMenuItem key={index}>
            <Link
              to={price.href}
              onClick={() => handlePriceChange(price.href)}
            >
              {price.label}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
