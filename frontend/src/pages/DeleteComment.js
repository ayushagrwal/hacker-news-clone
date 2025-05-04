import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import CommentBar from "../components/CommentBar";
import CustomTextarea from "../components/CustomTextArea";
import { deleteComment } from "../apis/apiCall";

export default function DeleteComment() {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state || {};
  const { id, author, createdAt, text, post } = data;

  const handleDeleteComment = async () => {
    try {
      const res = await deleteComment(id);
      navigate(-1);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-2 flex justify-center">
      <div className="w-[100%] sm:w-[85%]">
        <Navbar type="confirm" />

        <div className="bg-[#F6F6EF] h-auto p-4 flex flex-col">
          <CommentBar pageType="reply" />

          <div className="text-gray-500 text-base my-3">
            Do you want this to be deleted?
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleDeleteComment}
              className="bg-[#E5E5E5] text-black px-4 rounded-sm border w-20 border-black"
            >
              Yes
            </button>
            <button
              onClick={() => navigate(-1)}
              className="bg-[#E5E5E5] text-black px-4 rounded-sm border w-20 border-black"
            >
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
