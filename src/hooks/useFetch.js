import { useEffect, useState } from "react";

export const useFetch = (url, initialResults = null) => {
  const [results, setResults] = useState(initialResults);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // TODO: use debounce for search query updates
  useEffect(() => {
    const controller = new AbortController();

    const fetchSearchResults = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const res = await fetch(url, {
          signal: controller.signal,
        });

        // TODO handle
        // if (!res.ok) {}

        const data = await res.json();
        setResults(data);
        setIsLoading(false);
      } catch (error) {
        if (error.name === "AbortError") return;

        setError(error);
        setIsLoading(false);
      }
    };

    fetchSearchResults();

    return () => {
      controller.abort();
    };
  }, [url]);

  return { results, error, isLoading };
};
