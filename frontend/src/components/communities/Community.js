import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Card from "./CommunityCard.js";
import Axios from "axios";
import CommunityCard from "./CommunityCard.js";

function Community() {
  const { id } = useParams();
  const [data, setData] = useState(null);

  async function getData() {
    try {
      const response = await Axios.get(
        `http://localhost:3000/api/v1/hashtags/${id}`
      );
      console.log(response.data.data);
      setData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  if (!id) return null;

  return <CommunityCard resData={data} />;
}

export default Community;
