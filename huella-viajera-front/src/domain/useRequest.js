import { useEffect, useState } from "react";
import { getRequests } from "../api/request";

export const useRequests = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const cargarMisAplicaciones = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await getRequests();

      setData(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarMisAplicaciones();
  }, []);

  return { data, loading, error };
};
