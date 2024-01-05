import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";

const Userprofile = () => {
  const { username } = useParams();
  const [user, setUser] = useState(null);

  async function getData() {
    try {
      const response = await Axios.get(
        "http://localhost:3000/users/profile" + username
      );
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  if (!user) return null;

  return (
    <div className="m-4 p-4">
      <h1>
        <b>Name:</b> {username}
      </h1>
      <h1 className="font-semibold">Skills</h1>
      <ul className="list-disc my-4 ml-6">
        {user?.Skills?.map((skill, index) => (
          <li key={index}>{skill}</li>
        ))}
      </ul>
      <h1 className="font-semibold">Intrested in Learning</h1>
      <ul className="list-disc my-4 ml-6">
        {user?.Seeking?.map((skill, index) => (
          <li key={index}>{skill}</li>
        ))}
      </ul>
      <h3>JOB: {user?.Job}</h3>
      <h3>Company: {user?.Company}</h3>
      <h3>Gender: {user?.Gender}</h3>
      <h3>E-Mail ID: {user?.email}</h3>
    </div>
  );
};

export default Userprofile;
