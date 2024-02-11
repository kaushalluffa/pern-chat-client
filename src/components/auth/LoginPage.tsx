import { loginFn } from "@/api/login";
import { LoginReqPayload } from "@/utils/types";
import {
  Button,
  CircularProgress,
  Grid,
  Paper,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TransitionsSnackbar from "../shared/TransitionSnackbar";

const LoginPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [openSnackBar, setOpenSnackBar] = useState<{
    open: boolean;
    message: any;
  }>({ open: false, message: "" });
  const [loginFormData, setLoginFormData] = useState<LoginReqPayload>({
    email: "",
    password: "",
  });
  const [disable, setDisable] = useState<{
    message: string;
    status: boolean;
  }>({
    message: "",
    status: false,
  });
  const { isPending, mutate } = useMutation({
    mutationFn: ({ email, password }: LoginReqPayload) => {
      return loginFn({ email, password });
    },
    onSuccess: () => {
      setOpenSnackBar({
        open: true,
        message: "Logged in successfully. Now redirecting",
      });
      setDisable({ message: "", status: true });
      setTimeout(() => {
        navigate("/");
      }, 1500);
    },
    onError: (error: any) => {
      setOpenSnackBar({
        open: true,
        message: error,
      });
    },
  });
  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setLoginFormData((prev: LoginReqPayload) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }
  async function login() {
    mutate(loginFormData);
  }
  return (
    <>
      <Grid
        container
        width="100%"
        height="100vh"
        justifyContent="center"
        alignItems="center"
      >
        <Grid
          flexDirection="column"
          container
          component={Paper}
          variant="outlined"
          maxWidth={theme.breakpoints.values.sm}
          gap={2}
          p={4}
        >
          <Typography variant="h5">Already have an account?</Typography>
          <TextField
            onChange={handleChange}
            type="email"
            name="email"
            size="small"
            placeholder="Email"
          />
          <TextField
            onChange={handleChange}
            name="password"
            type="password"
            size="small"
            placeholder="Password"
          />
          <Button
            disabled={isPending || disable?.status}
            onClick={login}
            size="small"
            variant="contained"
          >
            {isPending ? <CircularProgress size={20} /> : "Login"}
          </Button>
          <Link to="/signup">Don't have an account? Sign up</Link>
        </Grid>
      </Grid>
      {openSnackBar?.open && (
        <TransitionsSnackbar
          isOpen={openSnackBar?.open}
          message={openSnackBar?.message}
        />
      )}
    </>
  );
};

export default LoginPage;
