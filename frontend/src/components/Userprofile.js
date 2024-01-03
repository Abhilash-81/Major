import React, { useState, useEffect } from "react";
import Axios from "axios";

const Userprofile = () => {
  const [users, setUsers] = useState();
  // const [user, setUser] = useState();
  async function getData() {
    try {
      const response = await Axios.get("http://localhost:3000/users/:id");
      console.log(response);
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  if (!users) return null;

  return (
    <div className="m-4 p-4">
      <h1>Name of the user or id</h1>
      <h1>Skills</h1>
      <ul className="list-disc my-4 ml-6">
        <li>React.js</li>
        <li>Node.js</li>
        <li>JavaScript</li>
      </ul>
      <h1>Intrested in Learning</h1>
      <ul className="list-disc my-4 ml-6">
        <li>Mongoose</li>
        <li>MongoDB</li>
      </ul>
    </div>
  );
};

export default Userprofile;
