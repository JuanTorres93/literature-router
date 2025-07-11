import { useFetch } from "./useFetch";
import { API_BASE_URL } from "../config";

export const useAuthor = (authorId) => {
  const url = `${API_BASE_URL}/authors/${authorId}.json`;
  const { results: author, isLoading } = useFetch(url, null);

  return { author, isLoading };
};
