import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { createPost } from "../apis/apiCall";
import { useNavigate } from "react-router-dom";
import CustomTextarea from "../components/CustomTextArea";

export default function CreatePost() {
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

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        const res = await createPost(formData);
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div className="p-2 flex justify-center">
      <div className="w-[100%] sm:w-[85%]">
        <Navbar type="submit" />

        <div className="bg-[#F6F6EF] h-auto px-2 py-4 flex flex-col gap-1">
          <div className="grid grid-cols-12 gap-1">
            <div className="col-span-1">
              <div className="text-gray-500 text-base">title:</div>
            </div>
            <div className="col-span-11">
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="border px-1 border-gray-900 rounded-sm w-96"
              />
              {errors.title && (
                <div className="text-red-500 text-sm">{errors.title}</div>
              )}
            </div>
            <div className="col-span-1">
              <div className="text-gray-500 text-base">url:</div>
            </div>
            <div className="col-span-11">
              <input
                type="text"
                value={formData.url}
                onChange={(e) =>
                  setFormData({ ...formData, url: e.target.value })
                }
                className="border px-1 border-gray-900 rounded-sm w-96"
              />
              {errors.url && (
                <div className="text-red-500 text-sm">{errors.url}</div>
              )}
            </div>
            <div className="col-span-1">
              <div className="text-gray-500 text-base">text:</div>
            </div>
            <div className="col-span-11">
              <CustomTextarea
                value={formData.text}
                onChange={(e) =>
                  setFormData({ ...formData, text: e.target.value })
                }
                rows={4}
              />
            </div>
            <div className="col-span-1"></div>
            <div className="col-span-11">
              <button
                onClick={handleSubmit}
                className="bg-[#E5E5E5] text-black px-4 rounded-sm border border-black"
              >
                submit
              </button>
            </div>
            <div className="col-span-1"></div>
            <div className="col-span-11">
              <div className="text-gray-400 text-base mt-2">
                Leave url blank to submit a question for discussion. If there is
                no url, text will appear at the top of the thread. If there is a
                url, text is optional.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
