import React, { useState, useEffect } from "react";
import Axios from "axios";

const CommunityTweets = ({ id }) => {
  const [data, setData] = useState(null);
  async function getData() {
    try {
      const response = await Axios.get(
        `http://localhost:3000/api/v1/tweets/${id}`
      );
      console.log(response?.data?.data);
      setData(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  if (!data) return null;
  return <div>{data.content}</div>;
};

export default CommunityTweets;
