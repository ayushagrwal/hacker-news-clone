import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { setQuery, setSort } from "../redux/slices/postSlice";
import { getHoursAgo } from "../utils/generalUtils";

export default function Postbar({id, title, url, points, author, commentsCount, createdAt}){
    return (
        <div className="flex gap-2 ">

            <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent cursor-pointer border-b-gray-500 mt-2">
            </div>

            <div>
            {url ? (
                <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-black text-base"
                >
                    {title}{" "}
                    <span className="text-gray-500 text-xs hover:underline">({url.replace(/^https?:\/\//, "")})</span>
                </a>
                ) : (
                <div className="text-black text-base">{title}</div>
            )}
                <div className="text-gray-600 text-xs space-x-1">
                    <span>{points} point{points !== 1 ? "s" : ""} by</span>

                    <a
                        href={`/user/${author?.id}`}
                        className="hover:underline"
                    >
                        {author?.name}
                    </a>

                    <a
                        href={`/post/${id}`}
                        className="hover:underline"
                    >
                        {getHoursAgo(createdAt)}
                    </a>

                    <span>|</span>

                    <a
                        href={`/post/${id}`}
                        className="hover:underline"
                    >
                        {commentsCount > 0 ? `${commentsCount} comments` : "discuss"}
                    </a>
                </div>

            </div>

        </div>
    )
}