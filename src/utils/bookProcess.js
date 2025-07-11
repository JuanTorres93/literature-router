export const extractCoverId = (book) => {
  const coverId = book?.covers?.[0] || book?.cover_id || book?.cover_i;

  return coverId;
};
