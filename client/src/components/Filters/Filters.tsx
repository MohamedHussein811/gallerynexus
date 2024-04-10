import React, { useState } from "react";
import Category from "./Category";
import Prices from "./Prices";
import { FiltersOFF, FiltersON } from "../../SVG/SVG";
import Styles from "./Styles";
import { useParams } from "react-router-dom";

export default function Filters({ setPriceRange }: any) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filtersVisible, setFiltersVisible] = useState(false);
  const { category } = useParams();

  const handleCategoryChange = (category: any) => {
    setSelectedCategory(category);
    setFiltersVisible(false);
  };

  return (
    <div className="p-4 col-span-1">
      <div className="block lg:hidden">
        <button
          onClick={() => setFiltersVisible(!filtersVisible)}
          className="text-gray-500 hover:text-gray-900 focus:outline-none focus:text-gray-900"
        >
          <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
            {filtersVisible ? <FiltersON /> : <FiltersOFF />}
          </svg>
        </button>
      </div>

      <div className={`${filtersVisible ? "block" : "hidden"} lg:block`}>
        <h2 className="text-lg font-semibold mb-4">Filters</h2>
        <Category
          selectedCategory={selectedCategory || category}
          handleCategoryChange={handleCategoryChange}
        />
        <Prices setPriceRange={setPriceRange} />

        <Styles />
      </div>
    </div>
  );
}
