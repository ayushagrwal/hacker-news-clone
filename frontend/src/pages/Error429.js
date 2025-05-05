import React from "react";
import Navbar from "../components/Navbar";

export default function Error429() {
  return (
    <div className="p-2 flex justify-center">
    <div className="w-[100%] sm:w-[85%]">
      <Navbar type="error" />

      <div className="bg-[#F6F6EF] h-auto p-4 flex flex-col">
        <div className="text-black">
        You have created too many posts/comments. Please try again later.
        </div>
        </div>
        </div>
        </div>
  )
}

