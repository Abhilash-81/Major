import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Axios from "axios";
import { addTweets } from "../utils/tweetsSlice";

const useAllTweets = () => {
  const dispatch = useDispatch();
  async function getData() {
    try {
      const response = await Axios.get(`http://localhost:3000/api/v1/tweets`);
      dispatch(addTweets(response?.data?.data));
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getData();
  }, []);
};

export default useAllTweets;
