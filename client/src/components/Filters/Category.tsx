import { useState } from "react";
import { Link } from "react-router-dom";

export default function Category({selectedCategory, handleCategoryChange }:any) {
    const [categoriesVisible, setCategoriesVisible] = useState(false);
    const categoryOptions = ["All", "Paintings", "Photography"];

    return (
      <div className="mb-4">
        <label htmlFor="category" className="text-sm font-semibold mb-2 block">
          Category
        </label>
        <div className="relative">
          <button
            onClick={() => setCategoriesVisible(!categoriesVisible)}
            className="w-full p-2 border border-gray-500 rounded-md text-left"
          >
            {selectedCategory || "Select a category"}
          </button>
          <div
            className={`${categoriesVisible ? "block" : "hidden"} absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md`}
          >
            {categoryOptions.map((category:any, index:number) => (
              <Link
                to={category}
                key={index}
                onClick={() => handleCategoryChange(category)}
                className="bg-zinc-900 text-white block w-full px-4 py-2 text-sm text-left hover:bg-gray-100 hover:text-black"
                >
                {category}
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }