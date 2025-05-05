import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import CommentBar from "../components/CommentBar";
import CustomTextarea from "../components/CustomTextArea";
import { createComment, getCommentReplies } from "../apis/apiCall";
import RenderComment from "../components/RenderComment";

export default function ReplyComment() {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state || {};
  const { id, author, createdAt, text, post, pageType } = data;
  const [reply, setReply] = useState("");
  const [allComments, setAllComments] = useState([]);

  useEffect(() => {
    fetchCommentReplies(id);
  }, [id]);

  const fetchCommentReplies = async (id) => {
    try {
      let result = await getCommentReplies(id);
      setAllComments(result?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddComment = async () => {
    try {
      const res = await createComment({
        postId: post?.id,
        text: reply,
        parentId: id,
      });
      window.location.reload();
    } catch (error) {
      console.log(error);
      if(error.status === 401){
        navigate("/login");
      }
      if(error.status === 429){
        // alert("You have created too many posts/comments. Please try again later.");
        navigate("/error-429");
      }
    }
  };

  return (
    <div className="p-2 flex justify-center">
      <div className="w-[100%] sm:w-[85%]">
        <Navbar type="comment" />

        <div className="bg-[#F6F6EF] h-auto p-4 flex flex-col">
          <CommentBar pageType="reply" />
          <CustomTextarea
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            rows={4}
            className="mt-2"
          />
          <button
            onClick={handleAddComment}
            className="bg-[#E5E5E5] text-black px-4 rounded-sm border mt-3 w-20 border-black"
            disabled={reply.length === 0}
          >
            reply
          </button>
          {allComments?.map((comment, idx) => (
            <RenderComment key={idx} comment={comment} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}
