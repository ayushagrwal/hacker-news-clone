import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Postbar from "../components/Postbar";
import { getPostById, updatePost } from "../apis/apiCall";
import CustomTextarea from "../components/CustomTextArea";

export default function EditPost() {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    url: "",
    text: "",
  });
  const [errors, setErrors] = useState({
    title: "",
    url: "",
  });

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      title: "",
      url: "",
    };

    // Title validation
    if (!formData.title || formData.title.trim() === "") {
      newErrors.title = "Title is required";
      valid = false;
    }

    // URL validation (only if provided)
    if (formData.url && formData.url.trim() !== "") {
      try {
        new URL(formData.url);
      } catch (e) {
        newErrors.url = "Please enter a valid URL";
        valid = false;
      }
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async() => {
    if (validateForm()) {
      try{
          const res = await updatePost(formData, id);
          navigate('/');
      } catch (error){
          console.log(error);
      }
    }
  }

  useEffect(() => {
    fetchPostDetails(id);
  }, [id]);

  const fetchPostDetails = async (id) => {
    try {
      let result = await getPostById(id);
      setPost(result?.data);
      setFormData({
        title: result?.data?.title,
        url: result?.data?.url,
        text: result?.data?.text,
      })
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-2 flex justify-center">
      <div className="w-[100%] sm:w-[85%]">
        <Navbar type="edit" />

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

            <div className="grid grid-cols-12 gap-1 mt-4">
            <div className="col-span-1">
              <div className="text-gray-500 text-base">title:</div>
            </div>
            <div className="col-span-11">
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="border px-1 border-gray-900 rounded-sm w-96"
              />
              {errors.title && <div className="text-red-500 text-sm">{errors.title}</div>}
            </div>
            <div className="col-span-1">
              <div className="text-gray-500 text-base">url:</div>
            </div>
            <div className="col-span-11">
                <input
                type="text"
                value={formData.url}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                className="border px-1 border-gray-900 rounded-sm w-96"
                />
                {errors.url && <div className="text-red-500 text-sm">{errors.url}</div>}
            </div>
            <div className="col-span-1">
              <div className="text-gray-500 text-base">text:</div>
            </div>
            <div className="col-span-11">
              <CustomTextarea
                value={formData.text}
                onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                rows={4}
              />
            </div>
            <div className="col-span-1"></div>
            <div className="col-span-11">
              <button onClick={handleSubmit} className="bg-[#E5E5E5] text-black px-4 rounded-sm border border-black">
                update
              </button>
            </div>
            <div className="col-span-1"></div>
            <div className="col-span-11">
            <div className="text-gray-400 text-base mt-2">
            Leave url blank to submit a question for discussion. If there is no
            url, text will appear at the top of the thread. If there is a url,
            text is optional.
          </div>
            </div>
          </div>


          </div>
          
        </div>
      </div>
    </div>
  );
}
