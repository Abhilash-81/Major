import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

const UpdateProfile = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [skills, setSkills] = useState("");
  const [seeking, setSeeking] = useState("");
  const [job, setJob] = useState("");
  const [company, setCompany] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");

  useEffect(() => {
    getUserProfile();
  }, []);

  const getUserProfile = async () => {
    try {
      const response = await Axios.get("http://localhost:3000/users/profile");
      const userData = response.data;
      setUsername(userData.username);
      setPassword(userData.password);
      setEmail(userData.email || "");
      setSkills(userData.skills);
      setSeeking(userData.seeking);
      setJob(userData.Job || "");
      setCompany(userData.Company || "");
      setAddress(userData.Address || "");
      setGender(userData.Gender || "");
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedProfile = {};
      if (username || email) {
        updatedProfile.username = username;
        updatedProfile.email = email;
      }
      if (password) updatedProfile.password = password;
      if (skills) updatedProfile.skills = skills;
      if (seeking) updatedProfile.seeking = seeking;
      if (job) updatedProfile.Job = job;
      if (company) updatedProfile.Company = company;
      if (address) updatedProfile.Address = address;
      if (gender) updatedProfile.Gender = gender;

      await Axios.put("http://localhost:3000/users/profile", updatedProfile);
      console.log("Profile updated successfully");
      navigate("/users/" + username);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="mx-auto p-6 bg-white rounded-md shadow-md max-w-screen-md">
      <h1 className="text-3xl font-bold mb-4">Update Profile</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-sm font-semibold mb-2"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required={!email} // Username is required if email is not provided
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-semibold mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required={!username} // Email is required if username is not provided
          />
        </div>
        <div className="mb-4">
          <label htmlFor="skills" className="block text-sm font-semibold mb-2">
            Skills
          </label>
          <input
            type="text"
            id="skills"
            className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Enter your skills as , separated values"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="seeking" className="block text-sm font-semibold mb-2">
            Seeking
          </label>
          <input
            type="text"
            id="seeking"
            className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Enter what you are seeking as , separated values"
            value={seeking}
            onChange={(e) => setSeeking(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="job" className="block text-sm font-semibold mb-2">
            Job
          </label>
          <input
            type="text"
            id="job"
            className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Enter your job"
            value={job}
            onChange={(e) => setJob(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="company" className="block text-sm font-semibold mb-2">
            Company
          </label>
          <input
            type="text"
            id="company"
            className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Enter your company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="address" className="block text-sm font-semibold mb-2">
            Address
          </label>
          <input
            type="text"
            id="address"
            className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Enter your address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="gender" className="block text-sm font-semibold mb-2">
            Gender
          </label>
          <select
            id="gender"
            className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">Select your gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;
