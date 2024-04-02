export const VITE_SERVER_URL = import.meta.env.VITE_SERVER_URL;
export const VITE_IMAGE_KIT_URL_ENDPOINT = import.meta.env
  .VITE_IMAGE_KIT_URL_ENDPOINT;
export const VITE_IMAGE_KIT_PUBLIC_KEY = import.meta.env
  .VITE_IMAGE_KIT_PUBLIC_KEY;
export const SERVER_ENDPOINTS = {
  AUTH: {
    LOGIN: "auth/login",
    SIGNUP: "auth/signup",
  },
  CONVERSATION: {
    CREATE: "conversation/create",
    GET: "conversation",
    DELETE: "conversation/delete",
  },
  IMG_KIT: {
    DELETE: "img-kit/delete",
  },
  MESSAGE: {
    CREATE: "message/create",
    DELETE: "message/delete",
    GET: "message",
  },
  USERS: {
    GET: "users/all",
  },
};
