import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUserFromToken } from "../utils/authUtils";
import { login, logout } from "../redux/slices/authSlice";
import { setQuery, setSort } from "../redux/slices/postSlice";

export default function Navbar({ type }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { sort, query } = useSelector((state) => state.post);

  // ------------------Login Management------------------------
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const username = useSelector((state) => state.auth.username);
  const userId = useSelector((state) => state.auth.id);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      const userData = getUserFromToken();
      // console.log("userData",userData);
      if (userData?.name) {
        dispatch(login({ username: userData.name, id: userData.id }));
      }
    } else {
      dispatch(logout());
    }
  }, [dispatch]);

  const handleLogout = () => {
    localStorage.clear();
    dispatch(logout());
  };

  return (
    <div className="bg-[#FF6600] h-7 px-2 flex flex-col sm:flex-row justify-between gap-2 sm:gap-0">
      <div className="flex items-center gap-2">
        <div
          onClick={() => navigate("/")}
          className="text-white border border-white w-6 h-6 flex items-center justify-center cursor-pointer"
        >
          Y
        </div>
        <div
          onClick={() => window.location.reload()}
          className=" text-black font-bold cursor-pointer"
        >
          {type === "submit"
            ? "Submit"
            : type === "comment"
            ? "Add Comment"
            : type === "confirm"
            ? "Confirm"
            : type === "edit"
            ? "Edit"
            : type === "user"
            ? "User Details"
            : "Hacker News"}
        </div>

        {query?.length === 0 && type === "landing" && (
          <div className="flex items-center gap-2">
            <div
              onClick={() => dispatch(setSort({ sort: "new" }))}
              className={`hover:text-white cursor-pointer ${
                sort === "new" ? "text-white" : "text-black"
              }`}
            >
              new
            </div>
            <div className=" text-black">|</div>
            <div
              onClick={() => dispatch(setSort({ sort: "best" }))}
              className={`hover:text-white cursor-pointer ${
                sort === "best" ? "text-white" : "text-black"
              }`}
            >
              best
            </div>
            <div className=" text-black">|</div>
            <div
              onClick={() => dispatch(setSort({ sort: "top" }))}
              className={`hover:text-white cursor-pointer ${
                sort === "top" ? "text-white" : "text-black"
              }`}
            >
              top
            </div>
            <div className=" text-black">|</div>
          </div>
        )}

        {type === "landing" && (
          <div
            className="text-black hover:text-white cursor-pointer"
            onClick={() => navigate("/submit")}
          >
            submit
          </div>
        )}
      </div>

      {type === "landing" && (
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => dispatch(setQuery({ query: e.target.value }))}
            placeholder="Search..."
            className="px-2 border bg-red-100 border-gray-900 rounded-md focus:outline-none mr-2 h-5"
          />
          {isLoggedIn ? (
            <>
              <div onClick={()=>navigate(`/user/${userId}`)} className="text-black cursor-pointer hover:underline">{username}</div>
              <div className="text-black">|</div>
              <div
                className="text-black hover:text-white cursor-pointer"
                onClick={handleLogout}
              >
                logout
              </div>
            </>
          ) : (
            <div
              className="text-black hover:text-white cursor-pointer"
              onClick={() => navigate("/login")}
            >
              login
            </div>
          )}
        </div>
      )}
    </div>
  );
}
