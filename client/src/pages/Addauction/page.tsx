import React, { useState } from "react";
import Axios from "axios";
import { api, useUser } from "../../constants/constants";
import Loading from "../../components/Loading/Loading";
import { useCookies } from "react-cookie";

export default function Addauction() {
  const { UserID, isArtist } = useUser();
  const [title, setTitle] = useState("");
  const [files, setImages] = useState<File[]>([]);
  const [size, setSize] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [cookies] = useCookies(["access_token"]);
  const [date, setDate] = useState("");
  const [enddate, setEndDate] = useState("");

  const handleTitleChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setTitle(e.target.value);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filesList: FileList | null = e.target.files;

    if (filesList) {
      const filesArray: File[] = Array.from(filesList);
      setImages(filesArray);
    }
  };

  const handleSizeChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSize(e.target.value);
  };

  const handlePriceChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setPrice(e.target.value);
  };

  const handleCategoryChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setCategory(e.target.value);
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const UploadURL = `https://api.cloudinary.com/v1_1/dc3jkijbn/upload`;

    const formData = new FormData();
    Array.from(files).forEach((file) => {
      formData.append("file", file);
    });
    formData.append("upload_preset", "lmh0dqq4");

    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "puro7whw");

        const res = await Axios.post(UploadURL, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        return res.data.url;
      });
      const filenames = await Promise.all(uploadPromises);
      if (filenames) {
        await Axios.post(
          `${api}/addauction`,
          {
            image: filenames,
            title,
            size,
            price,
            category,
            date,
            enddate,
          },
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${cookies.access_token}`,
            },
          }
        );

        window.location.reload();
      } else {
        console.error("Failed to upload files");
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  if (!isArtist) {
    return <Loading />;
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <div className="mb-4">
        <label htmlFor="title" className="block text-white">
          Starting Date
        </label>
        <input
          className="w-full bg-black mb-4 px-4 py-2 rounded-lg border text-white border-neutral-900 bg-transparent focus:outline-none focus:border-blue-500"
          type={"date"}
          name={"startingdate"}
          placeholder={"Starting Date"}
          value={date}
          onChange={(e) => setDate(e.target.value)}
          min={new Date().toISOString().split("T")[0]}
          max={
            new Date(new Date().setDate(new Date().getDate() + 30))
              .toISOString()
              .split("T")[0]
          }
          required
        />
        <label htmlFor="title" className="block text-white">
          Ending Date
        </label>
        <input
          className="w-full bg-black mb-4 px-4 py-2 rounded-lg border text-white border-neutral-900 bg-transparent focus:outline-none focus:border-blue-500"
          type={"date"}
          name={"endingdate"}
          placeholder={"Ending Date"}
          value={enddate}
          onChange={(e) => setEndDate(e.target.value)}
          min={
            new Date(new Date().setDate(new Date().getDate() + 1))
              .toISOString()
              .split("T")[0]
          }
          max={
            new Date(new Date().setDate(new Date().getDate() + 60))
              .toISOString()
              .split("T")[0]
          }
          required
        />
        <label htmlFor="title" className="block text-white">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={handleTitleChange}
          className="mt-1 p-2 border border-gray-300 rounded w-full bg-black"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="images" className="block text-white">
          Images
        </label>
        <input
          type="file"
          id="images"
          onChange={handleImageChange}
          multiple
          className="mt-1 p-2 border border-gray-300 rounded w-full bg-black"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="size" className="block text-white">
          Size
        </label>
        <input
          type="text"
          id="size"
          value={size}
          onChange={handleSizeChange}
          className="mt-1 p-2 border border-gray-300 rounded w-full bg-black"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="price" className="block text-white">
          Price
        </label>
        <input
          type="text"
          id="price"
          value={price}
          onChange={handlePriceChange}
          className="mt-1 p-2 border border-gray-300 rounded w-full bg-black"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="category" className="block text-white">
          Category
        </label>
        <select
          id="category"
          value={category}
          onChange={handleCategoryChange}
          className="mt-1 p-2 border border-gray-300 rounded w-full bg-black"
          required
        >
          <option value="">Select a category</option>
          <option value="Paintings">Paintings</option>
          <option value="Photography">Photography</option>
          <option value="Drawings">Drawings</option>
          <option value="Sculpture">Sculpture</option>
          <option value="Mixed Media">Mixed Media</option>
          <option value="Prints">Prints</option>
        </select>
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Add Auction
      </button>
    </form>
  );
}
