import { useEffect, useState } from "react";
import axios from "axios";

const useFetch = (options) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async function () {
      try {
        const response = await axios.request(options);
        setData(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        console.error(err);
      }
    })();
  }, []);

  return { data, loading, error };
};

export default useFetch;
