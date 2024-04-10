import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <img
        src={"/assets/Tools/404.png"}
        alt="404"
        width={300}
        height={300}
        className="w-auto h-auto"
      />

      <div className="text-center">
        {/*<div className="flex flex-row justify-center items-center">
          <h2 className="text-3xl font-bold flex flex-row text-center justify-center text-red-600">
            404 
          </h2>
          <h2> | Not Found</h2>
        </div>*/}

        <p>We could not find the page you were looking for.</p>
        <p>
          Go back to the{" "}
          <Link to="/" className="text-blue-500">
            Home Page
          </Link>
        </p>
      </div>
    </main>
  );
}
