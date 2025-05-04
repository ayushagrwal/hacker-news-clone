import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Postbar from "../components/Postbar";
import { getUserById } from "../apis/apiCall";
import { formatISOIntoDate } from "../utils/generalUtils";

export default function User() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  useEffect(() => {
    fetchUserDetails(id);
  }, [id]);

  const fetchUserDetails = async (id) => {
    try {
      let result = await getUserById(id);
      setUser(result?.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-2 flex justify-center">
      <div className="w-[100%] sm:w-[85%]">
        <Navbar type="user" />

        <div className="bg-[#F6F6EF] h-auto p-4 flex flex-col">
        <div className="grid grid-cols-12 gap-1">

            <div className="col-span-1">
              <div className="text-gray-500 text-base">user:</div>
            </div>
            <div className="col-span-11">
              <div className="text-black text-base">{user?.name}</div>
            </div>

            <div className="col-span-1">
              <div className="text-gray-500 text-base">email:</div>
            </div>
            <div className="col-span-11">
              <div className="text-black text-base">{user?.email}</div>
            </div>

            <div className="col-span-1">
              <div className="text-gray-500 text-base">created:</div>
            </div>
            <div className="col-span-11">
              <div className="text-black text-base">{formatISOIntoDate(user?.createdAt)}</div>
            </div>

            <div className="col-span-1">
              <div className="text-gray-500 text-base">posts:</div>
            </div>
            <div className="col-span-11">
              <div className="text-black text-base">{user?._count?.posts}</div>
            </div>

            <div className="col-span-1">
              <div className="text-gray-500 text-base">comments:</div>
            </div>
            <div className="col-span-11">
              <div className="text-black text-base">{user?._count?.comments}</div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
