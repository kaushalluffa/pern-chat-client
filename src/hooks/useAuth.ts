/* eslint-disable @typescript-eslint/no-unused-vars */
import { useAuthContext } from "@/contexts/AuthContext";
import { VITE_SERVER_URL } from "@/utils/constants";
import { SignupData } from "@/utils/types";
import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";

export default function useAuth() {
  const navigate = useNavigate();
  const [cookies, _, removeCookie] = useCookies(["token"]);
  const [showLoading, setShowLoading] = useState<boolean>(true);
  const [loading, setLoading] = useState<"login" | "signup" | null>(null);
  const { setLoggedInUser } = useAuthContext();
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
  const handleVerifyUser = useCallback(async () => {
    setShowLoading(true);
    const response = await axios(`${VITE_SERVER_URL}/auth/verifyUser`, {
      withCredentials: true,
    });
    if (response && response?.data && response?.data?.isAuthenticated) {
      setLoggedInUser(response?.data);
      navigate("/");
    }
    setShowLoading(false);
  }, [navigate, setLoggedInUser]);
  async function handleSignup() {
    setLoading("signup");
    const response = await axios(`${VITE_SERVER_URL}/auth/signup`, {
      method: "POST",
      data: {
        email: signupData?.email,
        name: signupData?.fullName,
        password: signupData?.password,
      },
      withCredentials: true,
    });

    if (response && response?.data) {
      setLoggedInUser({ isAuthenticated: true, user: response?.data });
      navigate("/");
    }
    setLoading(null);
  }
  async function handleLogin() {
    setLoading("login");
    const response = await axios(`${VITE_SERVER_URL}/auth/login`, {
      method: "POST",
      data: {
        email: loginData?.email,
        password: loginData?.password,
      },
      withCredentials: true,
    });
    if (response && response?.data) {
      setLoggedInUser({ isAuthenticated: true, user: response?.data });
      navigate("/");
    }
    setLoading(null);
  }
  async function logout() {
    await removeCookie("token");
    navigate("/login");
  }
  useEffect(() => {
    if (cookies && cookies?.token && typeof cookies?.token === "string") {
      handleVerifyUser();
    } else {
      setShowLoading(false);
    }
  }, [cookies, handleVerifyUser]);
  return {
    signupData,
    handleSignupDataChange,
    handleSignup,
    handleLogin,
    handleLoginDataChange,
    loginData,
    showLoading,
    loading,
    logout,
  };
}
