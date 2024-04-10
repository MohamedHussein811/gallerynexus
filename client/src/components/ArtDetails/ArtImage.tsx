
import { Link } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../components/ui/carousel";
import { DisableRightClick } from "../../constants/constants";

export default function ArtImage({
  currentImageIndex,
  artData,
  nextImage,
  prevImage,
}: any) {
  DisableRightClick();

  return (
    <div className="w-2/3 md:w-1/2 lg:w-1/3 relative rounded-lg overflow-hidden flex justify-center items-center">
      <div className="relative overflow-hidden  ">
          <>
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="m-4"
            >
              <CarouselContent>
                {artData.image.map(
                  (image: any, imgIndex: number) => (
                    <CarouselItem key={imgIndex}>
                      <Link to={`/Art/${artData._id}`} key={imgIndex}>
                        <img
                          width={300}
                          height={300}
                          src={image}
                          alt={`Artwork ${imgIndex + 1}`}
                          className="w-full object-cover rounded-lg"
 
                        />
                      </Link>
                    </CarouselItem>
                  )
                )}
              </CarouselContent>
              {artData.image?.length > 1 && (
                <>
                  <CarouselPrevious className="bg-gray-900 bg-opacity-50 hover:bg-opacity-75 text-white absolute top-1/2 transform -translate-y-1/2 left-2 rounded-full p-2" />
                  <CarouselNext className="bg-gray-900 bg-opacity-50 hover:bg-opacity-75 text-white absolute top-1/2 transform -translate-y-1/2 right-2 rounded-full p-2" />
                </>
              )}
            </Carousel>
          </>
      </div>
    </div>
  );
}
