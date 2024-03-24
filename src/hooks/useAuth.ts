/* eslint-disable @typescript-eslint/no-unused-vars */
import { userLogin, userSignup } from "@/api/authApiHandlers";
import { useAuthContext } from "@/contexts/AuthContext";
import { SignupData } from "@/utils/types";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export default function useAuth() {
  const navigate = useNavigate();
  const [cookies, _, removeCookie] = useCookies(["token"]);
  const [loading, setLoading] = useState<"login" | "signup" | null>(null);
  const { setLoggedInUser } = useAuthContext();
  const [tabValue, setTabValue] = useState<number>(0);
  function handleTabChange(event: React.SyntheticEvent, newValue: number) {
    setTabValue(newValue);
  }
  const [signupData, setSignupData] = useState<SignupData>({
    email: "",
    password: "",
    cPassword: "",
    showP: false,
    showCP: false,
    fullName: "",
    imageUrl: "",
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
    setLoading("signup");

    const response = await userSignup(signupData);
    if (response && response?.data) {
      setLoggedInUser({ isAuthenticated: true, user: response?.data });
      navigate("/");
    }
    setLoading(null);
  }
  async function handleLogin() {
    setLoading("login");
    const response = await userLogin(loginData);
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

  return {
    signupData,
    handleSignupDataChange,
    handleSignup,
    handleLogin,
    handleLoginDataChange,
    loginData,
    loading,
    logout,
    tabValue,
    setTabValue,
    handleTabChange,
  };
}
