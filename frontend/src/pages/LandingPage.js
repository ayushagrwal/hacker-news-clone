import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getPosts, searchPosts } from "../apis/apiCall";
import Navbar from "../components/Navbar";
import { nextPage, prevPage, setTotalPages, setCurrentPage, setPosts } from "../redux/slices/postSlice";
import Postbar from "../components/Postbar";

export default function LandingPage() {
  const dispatch = useDispatch();
  const { page, limit, sort, query, totalPages, currentPage, posts } = useSelector(
    (state) => state.post
  );

  //--------------------Posts-----------------------------
  const fetchPosts = async (page, limit, sort) => {
    try {
      let result = await getPosts(page, limit, sort);
      dispatch(setPosts({ posts: result?.data?.posts }));
      dispatch(setTotalPages({ totalPages: result?.data?.totalPages }));
      dispatch(setCurrentPage({ currentPage: result?.data?.currentPage }));
    } catch (error) {
      console.log(error);
    }
  };
  const fetchSearchPosts = async (page, limit, query) => {
    try {
      let result = await searchPosts(page, limit, query);
      dispatch(setPosts({ posts: result?.data?.posts }));
      dispatch(setTotalPages({ totalPages: result?.data?.totalPages }));
      dispatch(setCurrentPage({ currentPage: result?.data?.currentPage }));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (query?.length > 0) {
      fetchSearchPosts(page, limit, query);
    } else {
      fetchPosts(page, limit, sort);
    }
  }, [page, limit, query, sort]);

  return (
    <div className="px-2 py-4 flex justify-center">
      <div className="w-[100%] sm:w-[85%]">
        <Navbar type="landing" />

        <div className="bg-[#F6F6EF] h-auto p-2 flex flex-col gap-1">
          {posts?.map((post, index) => (
            <div className="flex gap-2" key={index}>
              <div className="text-gray-500">{index + 1}.</div>
              <Postbar
                id={post?.id}
                title={post?.title}
                url={post?.url}
                points={post?.points}
                author={post?.author}
                commentsCount={post?._count?.comments}
                createdAt={post?.createdAt}
              />
            </div>
          ))}
          <div className="flex justify-center">
        <div className="flex items-center gap-2 mt-4">
          <button
            // onClick={handleDeletePost}
            disabled={page === 1}
            onClick={() => {dispatch(prevPage());}}
            className="bg-[#E5E5E5] text-black rounded-sm border w-32 border-black"
          >
            {"<- Prev"}
          </button>
          <button
              disabled={currentPage === totalPages}
              onClick={() => {dispatch(nextPage());}}
            className="bg-[#E5E5E5] text-black rounded-sm border w-32 border-black"
          >
            {"Next ->"}
          </button>
        </div>
        </div>
        </div>

      </div>
    </div>
  );
}
