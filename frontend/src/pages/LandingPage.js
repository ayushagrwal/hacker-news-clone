import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { getPosts, searchPosts } from "../apis/apiCall";
import Navbar from "../components/Navbar";
import { setPosts } from "../redux/slices/postSlice";
import Postbar from "../components/Postbar";

export default function LandingPage() {

  const dispatch = useDispatch();
  const { page, limit, sort, query, posts } = useSelector(state => state.post);

  //--------------------Posts-----------------------------
  const fetchPosts = async (page, limit, sort) => {
    try {
      let result = await getPosts(page, limit, sort);
      dispatch(setPosts({posts: result?.data?.posts}));
    } catch (error) {
      console.log(error);
    }
  };
  const fetchSearchPosts = async (page, limit, query) => {
    try {
      let result = await searchPosts(page, limit, query);
      dispatch(setPosts({posts: result?.data?.posts}));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if(query?.length > 0){
      fetchSearchPosts(page, limit, query)
    } else {
      fetchPosts(page, limit, sort);
    }
  }, [page, limit, query, sort]);


    return (
        <div className="p-2 flex justify-center">
            <div className="w-[100%] sm:w-[85%]">
                <Navbar />

                <div className="bg-[#F6F6EF] min-h-60 p-2 flex flex-col gap-1">
                  {posts?.map((post, index) => (
                    <div className="flex gap-2" key={index}>
                      <div className="text-gray-500">
                        {index + 1}.
                      </div>
                      <Postbar id={post?.id} title={post?.title} url={post?.url} points={post?.points} author={post?.author} commentsCount={post?._count?.comments} createdAt={post?.createdAt} />
                    </div>
                  ))}
                </div>

            </div>
        </div>
    );
}