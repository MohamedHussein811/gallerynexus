import React from "react";

import Autoplay from "embla-carousel-autoplay";
import { Link } from "react-router-dom";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";

export default function Header() {
  const imageInfo = [
    {
      title: "New This Week",
      subtitle: "Discover New Art Our Curators Love Every Week",
      buttonText: "Start Exploring",
      link: "/",
    },
    {
      title: "Discover Art You Love",
      subtitle: "Browse Curated Collections Updated Daily",
      buttonText: "Shop Collections",
      link: "/",
    },
    {
      title: "Get Recommendations",
      subtitle: "Work with an Art Advisor to Find Your Perfect Artwork",
      buttonText: "Get Started",
      link: "/",
    },
  ];

  return (
    <div className="relative overflow-hidden flex justify-center items-center h-full">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 4000,
          }),
        ]}
        className="flex justify-center items-center relative"
      >
        <CarouselContent>
          {imageInfo.map((info, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <img
                  className="w-full px-0 h-full  sm:p-6"
                  width={100}
                  height={100}
                  src={`/assets/Header${index + 1}.jpg`}
                  alt={`Header ${index + 1}`}
                  style={{ filter: "brightness(50%)" }}
                                  />
              </div>
              <div className="absolute top-0 w-full h-full flex items-center justify-center">
                <div className="flex flex-col items-center text-white p-4 ">
                  <h2
                    className="text-2xl sm:text-4xl md:text-5xl text-center"
                    style={{ fontFamily: "Crimson Text, serif" }}
                  >
                    {info.title}
                  </h2>
                  <p className="sm:text-xl text-center">{info.subtitle}</p>
                  <Link
                    className="bg-gray-800 px-6 py-4 rounded-lg text-lg sm:text-xl mt-4 inline-block transition duration-300 hover:bg-gray-900 hover:text-white hover:scale-105 hover:shadow-md hover:border-gray-600"
                    to={info.link}
                  >
                    {info.buttonText}
                  </Link>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute bg-zinc-900 border-zinc-900 top-1/2 left-2 transform -translate-y-1/2 sm:left-10" />
        <CarouselNext className="absolute bg-zinc-900 border-zinc-900 top-1/2 right-2 transform -translate-y-1/2 sm:right-10" />
      </Carousel>
    </div>
  );
}
