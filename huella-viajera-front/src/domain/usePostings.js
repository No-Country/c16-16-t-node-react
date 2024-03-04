import { useEffect, useState } from "react";
import { getPostings } from "../api/posting";

export const usePostings = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const cargarPostings = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await getPostings();

      setData(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarPostings();
  }, []);

  return { data, loading, error };
};
