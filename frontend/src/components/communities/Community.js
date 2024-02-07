import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";

function Community() {
  const { id } = useParams();
  console.log(id);
  const [data, setData] = useState(null);
  async function getData() {
    try {
      const response = await Axios.get(
        `http://localhost:3000/api/v1/hashtags/${id}`
      );
      // setData(response.data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  if (!id) return null;
  return <>Community</>;
}

export default Community;
