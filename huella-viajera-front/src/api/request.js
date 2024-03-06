import axios from "axios";

const url = "https://huellaviajera.onrender.com/";

export const getRequests = async () => {
  try {
    const { data: response } = await axios.get(`${url}api/v1/request/getAll`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.token}`,
      },
    });

    return { data: response.data };
  } catch (error) {
    return Promise.reject(error.message);
  }
};
