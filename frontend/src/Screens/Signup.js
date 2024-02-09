import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import { AiOutlineUser, AiOutlineMail, AiOutlineLock } from "react-icons/ai";

const Signup = () => {
  const navigate = useNavigate();
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userId, setUserId] = useState("");
  const [skills, setSkills] = useState("");
  const [seeking, setSeeking] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = {
        username,
        email,
        password,
        userId,
        skills: skills.split(",").map((skill) => skill.trim()),
        seeking: seeking.split(",").map((item) => item.trim()),
      };

      const response = await Axios.post(
        "http://localhost:3000/api/v1/signup",
        userData
      );

      console.log("Signup successful:", response.data);
      navigate("/api/v1/login");
    } catch (error) {
      console.error("Signup error:", error);
      throw error;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full sm:w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-600 text-sm font-semibold mb-2"
            >
              <AiOutlineUser className="inline-block mr-2" />
              Your Name
            </label>
            <input
              type="text"
              id="username"
              className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Enter your name"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-600 text-sm font-semibold mb-2"
            >
              <AiOutlineMail className="inline-block mr-2" />
              Your Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-600 text-sm font-semibold mb-2"
            >
              <AiOutlineLock className="inline-block mr-2" />
              Your Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="userId"
              className="block text-gray-600 text-sm font-semibold mb-2"
            >
              User ID
            </label>
            <input
              type="number"
              id="userId"
              className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Enter your user ID"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="skills"
              className="block text-gray-600 text-sm font-semibold mb-2"
            >
              Skills
            </label>
            <input
              type="text"
              id="skills"
              className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Enter your skills separated by commas"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="seeking"
              className="block text-gray-600 text-sm font-semibold mb-2"
            >
              Seeking
            </label>
            <input
              type="text"
              id="seeking"
              className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Enter what you are seeking separated by commas"
              value={seeking}
              onChange={(e) => setSeeking(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
          >
            Sign Up
          </button>
          <Link to="/api/v1/login">
            <h3 className="p-2">
              Already have an Account? <b>Login</b>
            </h3>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Signup;
