import { useEffect, useState } from "react";

import { API_BASE_URL } from "../config";

export const useAuthorPhoto = (photoId, size = "M") => {
  // size can be "S", "M", "L"
  const [photoURL, setPhotoURL] = useState(null);
  const [isPhotoLoading, setIsPhotoLoading] = useState(true);

  useEffect(() => {
    setPhotoURL(
      `${API_BASE_URL.replace(
        "open",
        "covers.open"
      )}/a/id/${photoId}-${size}.jpg`
    );
  }, [photoId, size]);

  return {
    photoURL,
    isPhotoLoading,
    setIsPhotoLoading,
  };
};
