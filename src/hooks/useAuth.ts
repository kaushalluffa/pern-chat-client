import { userLogin, userSignup } from "@/api/authApiHandlers";
import { SignupData } from "@/utils/types";
import { useState } from "react";
import { useCookies } from "react-cookie";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./useAllContextHooks";

export default function useAuth() {
  const navigate = useNavigate();
  //eslint-disable-next-line
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
    try {
      const response = await userSignup(signupData);
      if (response && response?.data) {
        setLoggedInUser({ isAuthenticated: true, user: response?.data });
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.toString() ?? "Failed to sign up please try again", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    }
    setLoading(null);
  }
  async function handleLogin() {
    setLoading("login");
    try {
      const response = await userLogin(loginData);
      if (response && response?.data) {
        setLoggedInUser({ isAuthenticated: true, user: response?.data });
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.toString() ?? "Failed to login please try again", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    }
    setLoading(null);
  }
  async function logout() {
    await removeCookie("token");
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
