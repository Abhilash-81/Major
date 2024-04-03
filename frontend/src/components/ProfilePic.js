import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { toast } from "react-toastify";

const ProfilePic = () => {
  const [previewSource, setPreviewSource] = useState("");
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  const handleSubmitFile = (e) => {
    e.preventDefault();
    if (!previewSource) return;
    uploadImage(previewSource);
  };

  const uploadImage = async (base64EncodedImage) => {
    try {
      const response = await Axios.post(
        "http://localhost:3000/users/profile",
        { data: base64EncodedImage, username: user.username },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setPreviewSource(response?.data?.data?.url);
      toast("Successfully updated profile Pictures");
      // navigate(" /api/v1/profilePic");
    } catch (error) {
      console.error(error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  useEffect(() => {
    if (!user.username) {
      navigate("/api/v1/login");
    }
  }, []);

  return (
    <div className="max-w-md mx-auto mt-8 bg-white shadow-md rounded p-8">
      <div className="mb-4">
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleFileChange}
          className="border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
        />
        <button
          onClick={handleSubmitFile}
          className="mt-2 px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none"
        >
          Submit
        </button>
      </div>

      {previewSource && (
        <div className="w-8/12 sm:w-6/12 mx-auto">
          <img
            src={previewSource}
            alt="Profile Picture"
            className="shadow-lg rounded-full max-w-full h-auto align-middle border-none"
          />
        </div>
      )}
    </div>
  );
};

export default ProfilePic;
