import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setQuery, setSort } from "../redux/slices/postSlice";
import { getHoursAgo } from "../utils/generalUtils";
import { checkUserVoted, votePost } from "../apis/apiCall";

export default function Postbar({
  id,
  title,
  url,
  points,
  author,
  commentsCount,
  createdAt,
}) {
  const navigate = useNavigate();
  const authUserId = useSelector((state) => state.auth.id);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const [isVoted, setIsVoted] = useState(false);

  const fetchVoted = async () => {
    try {
      const res = await checkUserVoted(id);
      setIsVoted(res?.data?.hasVoted);
    } catch (error) {
      console.log(error);
    }
  };

  const handleVote = async (type) => {
    try {
      if(isLoggedIn){
        const res = await votePost({ value: 1 }, id);
        setIsVoted(type);
      } else {
        navigate('/login')
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if(isLoggedIn){
      fetchVoted();
    }
  }, [isLoggedIn]);

  return (
    <div className="flex gap-2 ">
      {!isVoted ? (
        <div
          onClick={() => handleVote(true)}
          className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent cursor-pointer border-b-gray-500 mt-2"
        ></div>
      ) : (
        <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-transparent mt-2"></div>
      )}

      <div>
        {url ? (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-black text-base cursor-pointer"
          >
            {title}{" "}
            <span className="text-gray-500 text-xs hover:underline">
              ({url.replace(/^https?:\/\//, "")})
            </span>
          </a>
        ) : (
          <div
            onClick={() => navigate(`/post/${id}`)}
            className="text-black text-base cursor-pointer"
          >
            {title}
          </div>
        )}
        <div className="text-gray-600 text-xs space-x-1 flex">
          <span>
            {points} point{points !== 1 ? "s" : ""} by
          </span>

          <a href={`/user/${author?.id}`} className="hover:underline">
            {author?.name}
          </a>

          <a href={`/post/${id}`} className="hover:underline">
            {getHoursAgo(createdAt)}
          </a>

          {isVoted && (
            <div className="text-gray-600 text-xs flex space-x-1">
              <span>|</span>

              <div
                onClick={() => handleVote(false)}
                className="hover:underline cursor-pointer"
              >
                unvote
              </div>
            </div>
          )}

          {authUserId === author?.id && (
            <div className="text-gray-600 text-xs flex space-x-1">
              <span>|</span>
              <div
                onClick={() => navigate(`/edit-post/${id}`)}
                className="hover:underline cursor-pointer"
              >
                edit
              </div>
              <span>|</span>
              <div
                onClick={() => navigate(`/delete-post/${id}`)}
                className="hover:underline cursor-pointer"
              >
                delete
              </div>
            </div>
          )}

          <span>|</span>

          <a href={`/post/${id}`} className="hover:underline">
            {commentsCount > 0 ? `${commentsCount} comments` : "discuss"}
          </a>
        </div>
      </div>
    </div>
  );
}
