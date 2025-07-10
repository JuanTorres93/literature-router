import { useEffect, useState } from "react";

import { API_BASE_URL } from "../config";

export const useBookCover = (coverId, size = "M") => {
  // size can be "S", "M", "L"
  const [coverURL, setCoverURL] = useState(null);

  useEffect(() => {
    setCoverURL(
      `${API_BASE_URL.replace(
        "open",
        "covers.open"
      )}/b/id/${coverId}-${size}.jpg`
    );
  }, [coverId, size]);

  return { coverURL };
};
