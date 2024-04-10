import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../components/ui/carousel";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../components/ui/alert-dialog";
import { DisableRightClick, api, useUser } from "../../constants/constants";
import axios from "axios";
import { useCookies } from "react-cookie";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const ArtworkItem = ({ artwork, userData, setRerender }: any) => {
  const { UserID } = useUser();
  const [cookies] = useCookies(["access_token"]);

  const handleDeleteItem = async (artworkId: string) => {
    try {
      const response = await axios.post(
        `${api}/deleteitem`,
        { artworkId },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${cookies.access_token}`,
          },
        }
      );
      setRerender((prev: any) => !prev);
      const timestamp = new Date().toLocaleString();
      toast(response.data.message, {
        description: timestamp,
        action: {
          label: "Close",
          onClick: () => console.log("Close"),
        },
      });
    } catch (error) {
      console.error(error);
    }
  };
  DisableRightClick();

  return (
    <li className="border p-4 rounded-lg shadow-md w-full md:w-auto">
      <div className="max-w-full">
        <h3 className="text-lg font-semibold break-all">{artwork.title}</h3>
        <p className="text-gray-300">Category: {artwork.category}</p>
        <p className="text-gray-300 break-all">Size: {artwork.size}</p>
        <p className="text-gray-300 break-all">Price: {artwork.price}</p>
      </div>

      {artwork.image.length > 0 && (
        <Carousel className="mt-4">
          <CarouselContent>
            {artwork.image.map((image: any, imgIndex: number) => (
              <CarouselItem key={imgIndex}>
                <Link to={`/Art/${artwork._id}`} key={imgIndex}>
                  <img
                    width={200}
                    height={200}
                    src={image}
                    alt={`Artwork ${imgIndex + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          {artwork.image?.length > 1 && (
            <>
              <CarouselPrevious className="bg-gray-900 bg-opacity-50 hover:bg-opacity-75 text-white absolute top-1/2 transform -translate-y-1/2 left-2 rounded-full p-2" />
              <CarouselNext className="bg-gray-900 bg-opacity-50 hover:bg-opacity-75 text-white absolute top-1/2 transform -translate-y-1/2 right-2 rounded-full p-2" />
            </>
          )}
        </Carousel>
      )}

      {userData._id === UserID && (
        <AlertDialog>
          <AlertDialogTrigger className="flex justify-end items-end bg-red-900 text-white p-2 my-2 rounded-lg">
            Delete Item
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-neutral-900">
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete this
                item from our server.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="bg-neutral-900">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={() => handleDeleteItem(artwork._id)}
                className="bg-red-900"
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </li>
  );
};

export default ArtworkItem;
