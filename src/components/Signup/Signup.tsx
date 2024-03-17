import {
  Grid,
  IconButton,
  Paper,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CustomButton from "../CustomButton/CustomButton";
import useAuth from "@/hooks/useAuth";

const Signup = () => {
  const theme = useTheme();
  const { signupData, handleSignupDataChange, handleSignup, loading } =
    useAuth();

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
          Sign Up
        </Typography>
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
          loading={loading === "signup"}
          disabled={loading === "signup"}
          onClick={() => {
            handleSignup();
          }}
          variant="contained"
        >
          Login
        </CustomButton>
      </Grid>
    </Grid>
  );
};

export default Signup;
