import axios from "axios";

const url = "http://localhost:3000/";

export const getMyProfile = async ({ id }) => {
  try {
    const { data: response } = await axios.get(
      `${url}api/v1/carers/profile/${id}`,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.token}`,
        },
      }
    );

    return { data: response.data };
  } catch (error) {
    return Promise.reject(error.message);
  }
};
