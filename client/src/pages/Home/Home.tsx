import React from "react";
import ShopBy from "../../components/Home/ShopBy";
import Header from "../../components/Home/Header";
import Discover from "../../components/Home/Discover";
import FeaturedCollection from "../../components/Home/FeaturedCollection";

export default function Home() {


  return (
    <>
      <Header />
      <Discover />
      <ShopBy Type="Category" />
      <FeaturedCollection />
      <ShopBy Type="Price" />
    </>
  );
}
