import { useState, useEffect, useCallback } from "react";
import Axios from "axios";

const axiosInstance = Axios.create({ timeout: 3000 });

const useFetch = ({ url, method, body, headers = {}, dep = [] }) => {
  // local states
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // effects
  useEffect(() => {
    fetchDataAsync();
  }, [...dep]);

  const fetchDataAsync = useCallback(async () => {
    setIsLoading(true);

    try {
      const { data } = await axiosInstance.request({
        url,
        method,
        body,
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
      });

      setResponse({ ...data });
    } catch (error) {
      console.log(">>> error", error);
      const {
        meta: { code },
        error: { message },
      } = error.response?.data;

      setError({ code, message });
    } finally {
      setIsLoading(false);
    }
  }, [url, method, body, headers, setIsLoading, setResponse, setError]);

  return { isLoading, error, response };
};

export default useFetch;
