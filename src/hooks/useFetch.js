import { useEffect, useState } from "react";

export const useFetch = (url, initialResults = null, debounceDelay = 300) => {
  const [results, setResults] = useState(initialResults);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedUrl, setDebouncedUrl] = useState(url);

  // Debounce the URL
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedUrl(url);
    }, debounceDelay);

    return () => clearTimeout(timer);
  }, [url, debounceDelay]);

  // Fetch data with debounced URL
  useEffect(() => {
    if (!debouncedUrl) return;

    const controller = new AbortController();

    const fetchSearchResults = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const res = await fetch(debouncedUrl, {
          signal: controller.signal,
        });

        if (!res.ok) throw new Error("Error fetching data");

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
  }, [debouncedUrl]);

  return { results, error, isLoading };
};
