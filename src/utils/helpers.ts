export const checkIfMessageIsFileUrl = (url: string) => {
  const regex = new RegExp(
    "https://ik\\.imagekit\\.io/[a-zA-Z0-9_-]+/[a-zA-Z0-9_-]+\\.[a-zA-Z0-9]+"
  );
  return regex.test(url);
};
export const checkIfUrlIsVideo = (url: string) => {
  const videoFormats = ["mp4", "mov", "avi", "mkv", "wmv", "flv", "webm"];
  const splitUrl = url?.split(".")?.pop();
  return videoFormats?.includes(splitUrl as string);
};
export const checkIfUrlIsImage = (url: string) => {
  const imageFormats = ["jpg", "jpeg", "png", "gif", "bmp", "svg"];
  const splitUrl = url?.split(".")?.pop();
  return imageFormats?.includes(splitUrl as string);
};
