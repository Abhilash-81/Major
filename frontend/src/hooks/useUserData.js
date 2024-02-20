import Axios from "axios";

const useUserData = (username) => {
  async function getData() {
    try {
      const response = await Axios.get(
        `http://localhost:3000/users/${username}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  getData();
};

export default useUserData;
