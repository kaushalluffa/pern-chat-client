import { Link, useNavigate } from "react-router-dom";
import React, { memo, useState } from "react";
import {
  Button,
  CircularProgress,
  Grid,
  Paper,
  TextField,
  useTheme,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import { useMutation } from "@tanstack/react-query";
import { signupFn } from "@/api/signup";
import { SignupReqPayload } from "@/utils/types";
import TransitionsSnackbar from "../shared/TransitionSnackbar";
import { VITE_SIGNUP_SUCCESS_REDIRECT } from "@/utils/constants";

const SignupPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [openSnackBar, setOpenSnackBar] = useState<{
    open: boolean;
    message: any;
  }>({ open: false, message: "" });
  const [disable, setDisable] = useState<{ message: string; status: boolean }>({
    message: "",
    status: false,
  });
  const [signupFormData, setSignupFormData] = useState<SignupReqPayload>({
    email: "",
    password: "",
    name: "",
  });
  const { isPending, mutate } = useMutation({
    mutationFn: ({ email, password, name }: SignupReqPayload) => {
      return signupFn({ email, password, name });
    },
    onSuccess: (data) => {
      setOpenSnackBar({
        open: true,
        message: "Signed up successfully. Now redirecting",
      });
      setDisable({ message: "", status: true });
      navigate(data?.redirect ?? VITE_SIGNUP_SUCCESS_REDIRECT);
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
    setSignupFormData((prev: SignupReqPayload) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }
  async function signup() {
    mutate(signupFormData);
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
          <Typography variant="h5">Don't have an account?</Typography>
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
          <TextField
            onChange={handleChange}
            type="text"
            name="name"
            size="small"
            placeholder="Name"
          />
          <Button
            disabled={isPending || disable?.status}
            onClick={signup}
            size="small"
            variant="contained"
          >
            {isPending ? <CircularProgress size={20} /> : "Signup"}
          </Button>
          <Link to="/login">Already have an account? Log in</Link>
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

export default memo(SignupPage);
