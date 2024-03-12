import { VITE_SERVER_URL } from "@/utils/constants";
import { SignupData, User } from "@/utils/types";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export default function useAuth() {
  const navigate = useNavigate();
  const [cookies] = useCookies(["token"]);
  const [showLoading, setShowLoading] = useState<boolean>(true);
  const [signupData, setSignupData] = useState<SignupData>({
    email: "",
    password: "",
    cPassword: "",
    showP: false,
    showCP: false,
    fullName: "",
  });
  const [loginData, setLoginData] = useState<{
    email: string;
    password: string;
    showP: boolean;
  }>({
    email: "",
    password: "",
    showP: false,
  });
  function handleSignupDataChange({
    key,
    value,
  }: {
    key: string;
    value: string | boolean;
  }) {
    setSignupData((prev) => ({ ...prev, [key]: value }));
  }
  function handleLoginDataChange({
    key,
    value,
  }: {
    key: string;
    value: string | boolean;
  }) {
    setLoginData((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSignup() {
    await axios(`${VITE_SERVER_URL}/auth/signup`, {
      method: "POST",
      data: {
        email: signupData?.email,
        name: signupData?.fullName,
        password: signupData?.password,
      },
      withCredentials: true,
    });
  }
  async function handleLogin() {
    await axios(`${VITE_SERVER_URL}/auth/login`, {
      method: "POST",
      data: {
        email: loginData?.email,
        password: loginData?.password,
      },
      withCredentials: true,
    });
  }

  useEffect(() => {
    if (cookies && cookies?.token && typeof cookies?.token === "string") {
      const decodedToken: User = jwtDecode(cookies?.token ?? "");
      if (decodedToken) {
        navigate("/");
      } else {
        setShowLoading(false);
      }
    } else {
      setShowLoading(false);
    }
  }, [cookies, navigate]);
  return {
    signupData,
    handleSignupDataChange,
    handleSignup,
    handleLogin,
    handleLoginDataChange,
    loginData,
    showLoading,
  };
}
