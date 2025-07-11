export const extractPhotoId = (author) => {
  return author?.photos?.at(0);
};
