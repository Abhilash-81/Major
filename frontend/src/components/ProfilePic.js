import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

const ProfilePic = () => {
  const [previewSource, setPreviewSource] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  console.log(user);

  const handleSubmitFile = (e) => {
    console.log("Submit");
    e.preventDefault();
    console.log(previewSource);
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
      console.log(response?.data?.data);
      setPreviewSource(response?.data?.data?.url);
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
    <div className="max-w-md mx-auto mt-8 bg-white shadow-md rounded px-8 py-6">
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
          className="m-2 p-2 text-white bg-blue-500 "
        >
          Submit
        </button>
      </div>

      {previewSource && (
        <div className="w-6/12 sm:w-4/12 mx-auto">
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
