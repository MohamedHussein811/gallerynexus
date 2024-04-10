import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";
import "./Footer.css";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../ui/accordion";
import Logo from "../Nav/Logo";
import { Link } from "react-router-dom";

export default function Footer() {
  const FooterColumn = ({ title, links, index }: any) => {
    return (
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger className="custom-link-styling hover:no-underline">{title}</AccordionTrigger>
          <AccordionContent>
            {links.map((link: any, linkIndex: number) => (
              <li key={linkIndex} className=" py-4">
                <Link
                  to={link.url}
                  className="custom-link-styling custom-font-family"
                >
                  {link.label}
                </Link>
              </li>
            ))}{" "}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );
  };

  const columnsData = [
    {
      title: "For Buyers",
      links: [
        { label: "Art Advisory Service", url: "/" },
        { label: "Buyers FAQ", url: "/" },
        { label: "Return Policy", url: "/" },
        { label: "Testimonials", url: "/" },
        { label: "Art Prints", url: "/" },
        { label: "Curator's circle", url: "/" },
        { label: "Catalog", url: "/" },
        { label: "Gift Card", url: "/" },
        { label: "Commissions", url: "/" },
      ],
    },
    {
      title: "For Artists",
      links: [
        { label: "Why should I sell here?", url: "/" },
        { label: "Artist Handbook", url: "/" },
      ],
    },
    {
      title: "About Us",
      links: [
        { label: "About", url: "/" },
        { label: "Contact Us", url: "/" },
        { label: "Blog", url: "/" },
        { label: "Gallery Nexus Stories", url: "/" },
      ],
    },
    {
      title: "Gallery Nexus",
      links: [
        { label: "Terms and Service", url: "/" },
        { label: "Privacy Policy", url: "/" },
        { label: "Cookie Notice", url: "/" },
        { label: "Affiliate Program", url: "/" },
        { label: "Accessibility", url: "/" },
        { label: "Gift Cards terms", url: "/" },
        { label: "Personal Information", url: "/" },
      ],
    },
    {
      title: "Top Categories",
      links: [
        { label: "Paintings", url: "/Artworks/Paintings" },
        { label: "Photography", url: "/Artworks/Photography" },
        { label: "Sculpture", url: "/Artworks/Sculpture" },
        { label: "Drawings", url: "/Artworks/Drawings" },
        { label: "Collage", url: "/Artworks/Collage" },
      ],
    },
  ];

  return (
    <footer className="py-12 mt-9 bg-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {columnsData.map((column, index) => (
            <FooterColumn
              key={index}
              index={index}
              title={column.title}
              links={column.links}
            />
          ))}
        </div>
        <div className="flex justify-between items-center mt-8">
          <p className="text-white">
            <Logo /> &copy; 2024 Gallery Nexus. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="text-white hover:text-gray-400">
              <FaFacebook className="h-6 w-6" />
            </a>
            <a href="#" className="text-white hover:text-gray-400">
              <FaTwitter className="h-6 w-6" />
            </a>
            <a href="#" className="text-white hover:text-gray-400">
              <FaInstagram className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
