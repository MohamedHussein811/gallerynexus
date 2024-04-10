import { Link } from "react-router-dom";
import { Flower } from "../../SVG/SVG";

export default function Logo() {
  return (
    <Link
      to="/"
      className="flex flex-row gap-x-2 items-center text-xl sm:text-2xl"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 461 455"
        className="h-6 w-6 rotating-svg"
      >
        <Flower />
      </svg>{" "}
      <span
        className="text-white font-semibold"
        style={{ fontFamily: "Crimson Text, serif" }}
      >
        Gallery Nexus
      </span>
    </Link>
  );
}
