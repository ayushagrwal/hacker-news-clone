import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getHoursAgo } from "../utils/generalUtils";

export default function CommentBar(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state || {};
  const authUserId = useSelector((state) => state.auth.id);

  const {
    id,
    author,
    createdAt,
    text,
    post,
    pageType,
  } = {
    id: props.id ?? data.id,
    author: props.author ?? data.author,
    createdAt: props.createdAt ?? data.createdAt,
    text: props.text ?? data.text,
    post: props.post ?? data.post,
    pageType: props.pageType ?? data.pageType ?? "post",
  };


  return (
    <div>
      <div className="text-gray-600 text-xs space-x-1 flex">
        <a href={`/user/${author?.id}`} className="hover:underline">
          by {author?.name}
        </a>

        <div onClick={() => window.location.reload()} className="hover:underline cursor-pointer">
          {getHoursAgo(createdAt)}
        </div>

        {authUserId === author?.id && (
          <div className="text-gray-600 text-xs flex space-x-1">
            <span>|</span>
            <div onClick={()=>navigate(`/edit-comment/${id}`,{
              state: {
                id,
                author,
                createdAt,
                text,
                post,
              },
            })} className="hover:underline cursor-pointer">edit</div>
            <span>|</span>
            <div onClick={()=>navigate(`/delete-comment/${id}`,{
              state: {
                id,
                author,
                createdAt,
                text,
                post,
              },
            })} className="hover:underline cursor-pointer">delete</div>
          </div>
        )}

        {pageType !== "post" && (
          <div className="text-gray-600 text-xs flex space-x-1">
            <span>|</span>
            <div>
              on: <span className="hover:underline cursor-pointer" onClick={()=>navigate(`/post/${post?.id}`)}>{post?.title}</span>
            </div>
          </div>
        )}
      </div>
      <div className="text-black text-sm">{text}</div>

      {pageType === "post" && (
        <div
          onClick={() =>
            navigate(`/reply`, {
              state: {
                id,
                author,
                createdAt,
                text,
                post,
                pageType: "reply",
              },
            })
          }
          className="text-black text-xs underline cursor-pointer mt-1"
        >
          reply
        </div>
      )}
    </div>
  );
}
