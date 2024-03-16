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
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import useAuth from "@/hooks/useAuth";
import CustomButton from "../shared/CustomButton";
const Login = () => {
  const {
    loginData,
    handleLoginDataChange,
    handleLogin,
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
        <Typography variant="h5">Sign In</Typography>
        <TextField
          value={loginData?.email}
          onChange={(
            event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
          ) => {
            handleLoginDataChange({ key: "email", value: event.target.value });
          }}
          size="small"
          placeholder="Enter your email"
        />
        <TextField
          value={loginData?.password}
          onChange={(
            event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
          ) => {
            handleLoginDataChange({
              key: "password",
              value: event.target.value,
            });
          }}
          type={loginData?.showP ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <IconButton
                onClick={() => {
                  handleLoginDataChange({
                    key: "showP",
                    value: !loginData?.showP,
                  });
                }}
              >
                {loginData?.showP ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </IconButton>
            ),
          }}
          size="small"
          placeholder="Enter your password"
        />
        <CustomButton
          loading={loading === "login"}
          disabled={loading === "login"}
          onClick={() => handleLogin()}
          variant="contained"
        >
          Login
        </CustomButton>
        <Link to="/signup" style={{ textAlign: "center" }}>
          Don&apos;t have an account? Signup
        </Link>
      </Grid>
    </Grid>
  );
};

export default Login;
