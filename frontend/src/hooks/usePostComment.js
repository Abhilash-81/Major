import { useEffect } from "react";
import Axios from "axios";

const usePostComment = (modelId, modelType, userId, content) => {
  async function postComment() {
    const response = await Axios.post(
      `http://localhost:3000/api/v1/comments?modelId=${modelId}&modelType=${modelType}`,
      {
        userId,
        content,
      }
    );
  }
  useEffect(() => {
    postComment();
  }, []);
};

export default usePostComment;
