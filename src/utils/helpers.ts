export const checkIfMessageIsFileUrl = (url: string) => {
  const regex = new RegExp(
    "https://ik\\.imagekit\\.io/[a-zA-Z0-9_-]+/[a-zA-Z0-9_-]+\\.[a-zA-Z0-9]+"
  );
  return regex.test(url);
};
