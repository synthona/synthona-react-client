export const validUrl = (value) => {
  const url = new URL(value);
  return url.href;
};

export const isImageUrl = (url) => {
  return url.match(/\..+(jpeg|jpg|gif|png)/) != null;
};
