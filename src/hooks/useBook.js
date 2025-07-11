import { useFetch } from "../hooks/useFetch";
import { API_BASE_URL } from "../config";

export const useBook = (bookId) => {
  const { results: book, isLoading } = useFetch(
    `${API_BASE_URL}/works/${bookId}.json`,
    null
  );

  return { book, isLoading };
};
