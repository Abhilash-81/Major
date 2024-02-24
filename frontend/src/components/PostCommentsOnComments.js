import { useEffect } from "react";
import Axios from "axios";

const PostCommentsOnComments = (content, modelId) => {
  console.log(content, modelId);
  const userId = useSelector((state) => state.user.userId);
  useEffect(async () => {
    const response = await Axios.post(
      `http://localhost:3000/api/v1/comments?modelId=${modelId.id}&modelType=Comment`,
      {
        content: content.content,
        userId,
      }
    );
    console.log(response);
  }, []);
};

export default PostCommentsOnComments;
