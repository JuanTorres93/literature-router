import { useState } from "react";

function URLImg({
  imgURL,
  altText,
  loaderElement = "Loading",
  notFoundImg = "no-image.png",
}) {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && loaderElement}
      <img
        src={imgURL && !hasError ? imgURL : notFoundImg}
        alt={isLoading ? "" : altText}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
        }}
      />
    </>
  );
}

export default URLImg;
