import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Axios from "axios";
import ImageCard from "./ImageCard";
import { useSelector } from "react-redux";

const Userprofile = () => {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const logInUsername = useSelector((store) => store?.user?.username);

  async function getData() {
    try {
      const response = await Axios.get(
        `http://localhost:3000/users/${username}`
      );
      setUser(response.data);
    } catch (error) {
      throw error;
    }
  }

  useEffect(() => {
    if (!logInUsername) {
      navigate("/api/v1/login");
    }
    getData();
  }, []);

  if (!user) return null; //return loading

  return (
    <div className="mx-auto p-6 bg-white rounded-md shadow-md max-w-screen-md relative">
      <div className="flex items-center justify-between">
        <ImageCard name={username} image={user.image} />
      </div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2 border-b-2 pb-2">Skills</h2>
        <ul className="mt-1 list-disc ml-6 border-l-2 pl-6">
          {user?.Skills?.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Interested in Learning</h2>
        <ul className="list-disc ml-6 border-l-2 pl-6">
          {!user?.Seeking || user?.Seeking?.length === 0 ? (
            <h1>Not Mentioned</h1>
          ) : (
            user?.Seeking?.map((interest, index) => (
              <li key={index}>{interest}</li>
            ))
          )}
        </ul>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-100 p-4 rounded">
        <div className="bg-white p-4 rounded">
          <h3 className="text-sm font-semibold">
            E-MailID: {user?.email || "Not specified"}
          </h3>
          <h3 className="text-md font-semibold">
            Job: {user?.Job || "Not specified"}
          </h3>
          <h3 className="text-sm font-semibold">
            Company: {user?.Company || "Not specified"}
          </h3>
          <h3 className="text-sm font-semibold">
            Gender: {user?.Gender || "Not specified"}
          </h3>
        </div>
        <div className="bg-white p-4 rounded">
          <h3 className="text-sm font-semibold">
            Name: {user?.username || "Not specified"}
          </h3>
          <h3 className="text-sm font-semibold">
            Address: {user?.Address || "Not specified"}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Userprofile;
