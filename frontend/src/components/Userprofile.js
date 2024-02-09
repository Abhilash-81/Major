import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Axios from "axios";
import profilepic from "../assets/profilepic.png";
import UpdateProfile from "./UpdateProfile";
import ImageCard from "./ImageCard";

const Userprofile = () => {
  const { username } = useParams();
  const [user, setUser] = useState(null);

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
    getData();
  }, []);

  if (!user) return null;

  return (
    <div className="mx-auto p-6 bg-white rounded-md shadow-md max-w-screen-md relative">
      <ImageCard name={user?.name || username} />
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Skills</h2>
        <ul className="list-disc ml-6">
          {user?.Skills?.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      </div>
      <div className="absolute top-0 right-0 mt-4 mr-4">
        <Link to="/users/profile">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue">
            Update Profile
          </button>
        </Link>
      </div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Interested in Learning</h2>
        <ul className="list-disc ml-6">
          {!user?.Seeking || user?.Seeking?.length === 0 ? (
            <h1>Not Mentioned</h1>
          ) : (
            user?.Seeking?.map((interest, index) => (
              <li key={index}>{interest}</li>
            ))
          )}
        </ul>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="textmd font-semibold">
            E-MailID: {user?.email || "Not specified"}
          </h3>
          <h3 className="textmd font-semibold">
            Job: {user?.Job || "Not specified"}
          </h3>
          <h3 className="textmd font-semibold">
            Company: {user?.Company || "Not specified"}
          </h3>
          <h3 className="textmd font-semibold">
            Gender: {user?.Gender || "Not specified"}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Userprofile;
