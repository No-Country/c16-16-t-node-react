import axios from "axios";

const url = "http://localhost:3000/";

export const getPostings = async () => {
  try {
    const { data: response } = await axios.get(`${url}api/v1/posting/list`);

    return { data: response.data };
  } catch (error) {
    return Promise.reject(error.message);
  }
};
