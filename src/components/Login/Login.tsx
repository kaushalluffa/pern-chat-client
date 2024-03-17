import {
  Grid,
  IconButton,
  Paper,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import useAuth from "@/hooks/useAuth";
import CustomButton from "../CustomButton/CustomButton";

const Login = () => {
  const theme = useTheme();
  const {
    loginData,
    handleLoginDataChange,
    handleLogin,

    loading,
  } = useAuth();

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
        <TextField
          value={loginData?.email}
          onChange={(
            event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
          ) => {
            handleLoginDataChange({ key: "email", value: event.target.value });
          }}
          size="small"
          placeholder="Enter your email"
          sx={{
            "& .MuiInput-underline:after": {
              borderBottomColor: theme.palette.divider,
            },
            "& .MuiOutlinedInput-root": {
              color: theme.palette.text.secondary,
              borderRadius: 4,
              "& fieldset": {
                borderColor: theme.palette.divider,
              },
              "&:hover fieldset": {
                borderColor: theme.palette.divider,
              },
              "&.Mui-focused fieldset": {
                borderColor: theme.palette.divider,
              },
            },
          }}
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
          sx={{
            "& .MuiInput-underline:after": {
              borderBottomColor: theme.palette.divider,
            },
            "& .MuiOutlinedInput-root": {
              color: theme.palette.text.secondary,
              borderRadius: 4,
              "& fieldset": {
                borderColor: theme.palette.divider,
              },
              "&:hover fieldset": {
                borderColor: theme.palette.divider,
              },
              "&.Mui-focused fieldset": {
                borderColor: theme.palette.divider,
              },
            },
          }}
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
