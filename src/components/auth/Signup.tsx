import {
  CircularProgress,
  Grid,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CustomButton from "../shared/CustomButton";
import useAuth from "@/hooks/useAuth";
const Signup = () => {
  const {
    signupData,
    handleSignupDataChange,
    handleSignup,
    showLoading,
    loading,
  } = useAuth();
  if (showLoading) {
    return (
      <Grid
        container
        width="100%"
        height="100vh"
        justifyContent="center"
        alignItems="center"
      >
        <CircularProgress />
      </Grid>
    );
  }
  return (
    <Grid
      container
      width="100%"
      height="100vh"
      justifyContent="center"
      alignItems="center"
    >
      <Grid
        container
        flexDirection="column"
        gap={2}
        sx={{ width: { xs: "300px", sm: "400px", md: "500px" } }}
        component={Paper}
        variant="elevation"
        p={{ xs: 2, sm: 4, md: 8 }}
      >
        <Typography variant="h5">Sign Up</Typography>
        <TextField
          value={signupData?.email}
          size="small"
          placeholder="Enter your email"
          name="email"
          type="email"
          onChange={(
            event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
          ) => {
            handleSignupDataChange({ key: "email", value: event.target.value });
          }}
        />
        <TextField
          value={signupData?.fullName}
          size="small"
          placeholder="Full Name"
          name="fullName"
          type="text"
          onChange={(
            event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
          ) => {
            handleSignupDataChange({
              key: "fullName",
              value: event.target.value,
            });
          }}
        />
        <TextField
          value={signupData?.password}
          size="small"
          placeholder="Enter your password"
          name="password"
          type={signupData?.showP ? "text" : "password"}
          onChange={(
            event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
          ) => {
            handleSignupDataChange({
              key: "password",
              value: event.target.value,
            });
          }}
          InputProps={{
            endAdornment: (
              <IconButton
                onClick={() => {
                  handleSignupDataChange({
                    key: "showP",
                    value: !signupData?.showP,
                  });
                }}
              >
                {signupData?.showP ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </IconButton>
            ),
          }}
        />
        <TextField
          value={signupData?.cPassword}
          size="small"
          placeholder="Confirm your password"
          name="cPassword"
          type={signupData?.showCP ? "text" : "password"}
          onChange={(
            event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
          ) => {
            handleSignupDataChange({
              key: "cPassword",
              value: event.target.value,
            });
          }}
          InputProps={{
            endAdornment: (
              <IconButton
                onClick={() => {
                  handleSignupDataChange({
                    key: "showCP",
                    value: !signupData?.showCP,
                  });
                }}
              >
                {signupData?.showCP ? (
                  <VisibilityIcon />
                ) : (
                  <VisibilityOffIcon />
                )}
              </IconButton>
            ),
          }}
        />
        <CustomButton
          loading={loading === "signup"}
          disabled={loading === "signup"}
          onClick={() => {
            handleSignup();
          }}
          variant="contained"
        >
          Login
        </CustomButton>
        <Link to="/login" style={{ textAlign: "center" }}>
          Have account already? Login
        </Link>
      </Grid>
    </Grid>
  );
};

export default Signup;
