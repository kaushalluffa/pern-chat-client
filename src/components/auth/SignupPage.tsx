import { Navigate, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";

const SignupPage = () => {
  useEffect(() => {
    window.location.href = import.meta.env.VITE_SIGNUP_SERVER_URL;
  }, []);
  return null;
};

export default SignupPage;
