import { useEffect, useState } from "react";
import { getMyProfile } from "../api/profile";

export const useMyProfile = ({ id }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const cargarMiPerfil = async ({ id }) => {
    setLoading(true);
    setError("");

    try {
      const response = await getMyProfile({ id });

      setData(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarMiPerfil({ id });
  }, [id]);

  return { data, loading, error };
};
