import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import CommentBar from "../components/CommentBar";
import CustomTextarea from "../components/CustomTextArea";
import { updateComment } from "../apis/apiCall";

export default function EditComment() {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state || {};
  const { id, author, createdAt, text, post } = data;

  const [updatedComment, setUpdatedComment] = useState(text);

  const handleUpdateComment = async () => {
    try {
      const res = await updateComment({ text: updatedComment }, id);
      navigate(-1);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-2 flex justify-center">
      <div className="w-[100%] sm:w-[85%]">
        <Navbar type="edit" />

        <div className="bg-[#F6F6EF] h-auto p-4 flex flex-col">
          <CommentBar pageType="reply" />

          <div className="flex items-start gap-2 mt-4">
            <div className="text-gray-400 text-base">text:</div>
            <CustomTextarea
              value={updatedComment}
              onChange={(e) => setUpdatedComment(e.target.value)}
              rows={4}
            />
          </div>

          <button
            onClick={handleUpdateComment}
            className="bg-[#E5E5E5] text-black px-4 rounded-sm border mt-3 ml-4 w-20 border-black"
            disabled={updateComment?.length === 0}
          >
            update
          </button>
        </div>
      </div>
    </div>
  );
}
