import { Grid, IconButton, Paper, Typography, useTheme } from "@mui/material";
import React from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import useAuth from "@/hooks/useAuth";
import CustomButton from "../Custom/CustomButton";
import CustomTextField from "../Custom/CustomTextField";

const Login = () => {
  const theme = useTheme();
  const { loginData, handleLoginDataChange, handleLogin, loading } = useAuth();

  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid
        container
        flexDirection="column"
        gap={2}
        sx={{ width: { xs: "300px", sm: "400px", md: "500px" } }}
        component={Paper}
        variant="elevation"
        p={{ xs: 2, sm: 4, md: 8 }}
      >
        <Typography variant="h5" color={theme.palette.text.secondary}>
          Sign In
        </Typography>
        <CustomTextField
          label="Email"
          required
          value={loginData?.email}
          onChange={(
            event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
          ) => {
            handleLoginDataChange({ key: "email", value: event.target.value });
          }}
          size="small"
          placeholder="Enter your email"
        />
        <CustomTextField
          label="Password"
          required
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
      </Grid>
    </Grid>
  );
};

export default Login;
