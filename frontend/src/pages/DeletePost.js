import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Postbar from "../components/Postbar";
import { deletePost, getPostById } from "../apis/apiCall";

export default function DeletePost() {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchPostDetails(id);
  }, [id]);

  const fetchPostDetails = async (id) => {
    try {
      let result = await getPostById(id);
      setPost(result?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeletePost = async () => {
    try {
      const res = await deletePost(id);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-2 flex justify-center">
      <div className="w-[100%] sm:w-[85%]">
        <Navbar type="confirm" />

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

            <div className="text-gray-500 text-base my-3">
              Do you want this to be deleted?
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleDeletePost}
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
    </div>
  );
}
