import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Postbar from "../components/Postbar";
import { getPostById, getPostComments, createComment } from "../apis/apiCall";
import CustomTextarea from "../components/CustomTextArea";
import RenderComment from "../components/RenderComment";

export default function Post() {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);

  useEffect(() => {
    fetchPostDetails(id);
    fetchPostComments(id);
  }, [id]);

  const fetchPostDetails = async (id) => {
    try {
      let result = await getPostById(id);
      setPost(result?.data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchPostComments = async (id) => {
    try {
      let result = await getPostComments(id);
      setAllComments(result?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddComment = async () => {
    try {
      const res = await createComment({
        postId: id,
        text: comment,
        parentId: null,
      });
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-2 flex justify-center">
      <div className="w-[100%] sm:w-[85%]">
        <Navbar type="comment" />

        <div className="bg-[#F6F6EF] h-auto p-4 flex flex-col">
          <Postbar
            id={id}
            title={post?.title}
            url={post?.url}
            points={post?.points}
            author={post?.author}
            commentsCount={post?._count?.comments}
            createdAt={post?.createdAt}
          />

          <div className="ml-4 flex flex-col gap-1 mt-2 mb-4">
            <div className="text-gray-500">{post?.text}</div>

            <CustomTextarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
              className="mt-2"
            />

            <button
              onClick={handleAddComment}
              className="bg-[#E5E5E5] text-black px-2 rounded-sm border border-black mt-3 w-36"
              disabled={comment?.length === 0}
            >
              add comment
            </button>
          </div>
          {allComments?.map((comment, idx) => (
            <RenderComment key={idx} comment={comment} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}
