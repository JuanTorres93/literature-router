export const extractCoverId = (book) => {
  const coverId = book?.covers?.[0] || book?.cover_id || book?.cover_i;

  return coverId;
};

export const extractAuthorId = (book) => {
  const authors = book?.authors || [];

  const ids = authors.map((obj) => obj.author.key.split("/").pop());

  // NOTE: can be multiple authors, but I'm not going to handle it in this app
  return ids[0];
};

export const extractDescription = (book) => {
  const description = book?.description?.value || book?.description;

  if (typeof description === "string") {
    return description;
  }

  if (typeof description === "object" && description?.type === "text") {
    return description.value;
  }

  return "No description available.";
};
