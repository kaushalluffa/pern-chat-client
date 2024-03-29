/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Avatar,
  Badge,
  Grid,
  IconButton,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect } from "react";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CustomButton from "../Custom/CustomButton";
import useAuth from "@/hooks/useAuth";
import { useImageKitContext } from "@/contexts/ImageKitContext";
import CustomTextField from "../Custom/CustomTextField";

const Signup = () => {
  const theme = useTheme();
  const { signupData, handleSignupDataChange, handleSignup, loading } =
    useAuth();
  const { ikUploadRef, fileUrl, uploadImgLoading, setFileUrl } =
    useImageKitContext();
  useEffect(() => {
    if (fileUrl) {
      handleSignupDataChange({ key: "imageUrl", value: fileUrl ?? "" });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fileUrl]);

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
        <Grid item display="flex" alignItems="center" gap={1}>
          <Badge
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            badgeContent={
              <Typography fontWeight="bold" color={theme.palette.error.main}>
                *
              </Typography>
            }
          >
            <Avatar src={signupData?.imageUrl} />
          </Badge>

          <CustomButton
            loading={uploadImgLoading}
            disabled={uploadImgLoading}
            onClick={() => {
              ikUploadRef &&
                ikUploadRef?.current &&
                ikUploadRef?.current?.click();
            }}
            variant="text"
          >
            Add profile picture
          </CustomButton>
        </Grid>
        <CustomTextField
          label="Email"
          required
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
        <CustomTextField
          label="Full Name"
          required
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
        <CustomTextField
          label="Password"
          required
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
        <CustomTextField
          label="Confirm Password"
          required
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
          loading={uploadImgLoading || loading === "signup"}
          disabled={uploadImgLoading || loading === "signup"}
          onClick={() => {
            handleSignup();
            setFileUrl(null);
          }}
          variant="contained"
        >
          Signup
        </CustomButton>
      </Grid>
    </Grid>
  );
};

export default Signup;
