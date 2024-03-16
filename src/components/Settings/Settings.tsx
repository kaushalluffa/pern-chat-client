import {
  Avatar,
  Container,
  Grid,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import CustomButton from "../shared/CustomButton";

const Settings = () => {
  const [changePasswordData, setChangePasswordData] = useState<{
    oldPassword: string;
    newPassword: string;
    showOldPassword: boolean;
    showNewPassword: boolean;
  }>({
    oldPassword: "",
    newPassword: "",
    showNewPassword: false,
    showOldPassword: false,
  });
  const [changeNameData, setChangeNameData] = useState<string>("");
  function handleChangePasswordData({
    key,
    value,
  }: {
    key: "oldPassword" | "newPassword" | "showOldPassword" | "showNewPassword";
    value: string | boolean;
  }) {
    setChangePasswordData((prev) => ({ ...prev, [key]: value }));
  }
  return (
    <Grid
      container
      sx={{
        backgroundImage: `radial-gradient(#444cf7 2px, transparent 2px), radial-gradient(#444cf7 2px, transparent 2px)`,
        backgroundSize: " 80px 80px",
        backgroundPosition: "0 0,40px 40px",
        height: "100vh",
        width: "100%",
      }}
      justifyContent="center"
      alignItems={"center"}
    >
      <Container maxWidth="sm">
        <Grid container flexDirection="column" p={4} gap={3} component={Paper}>
          <Grid container flexDirection="column" gap={1}>
            <Typography variant="h5">Account Settings</Typography>
            <Typography variant="body1">
              This is the account settings page.
            </Typography>
          </Grid>
          <Grid container alignItems="center" gap={2}>
            <Avatar />
            <Typography variant="body2">Click on picture to update</Typography>
          </Grid>
          <Grid container flexDirection="column" gap={2}>
            <Typography variant="h5">Change Name</Typography>
            <TextField
              size="small"
              label="Your name"
              placeholder="Your name"
              type="text"
              value={changeNameData}
              onChange={(
                event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
              ) => {
                setChangeNameData(event.target.value);
              }}
            />
          </Grid>
          <Grid container flexDirection="column" gap={2}>
            <Typography variant="h5">Change Password</Typography>
            <TextField
              size="small"
              label="Current Password"
              placeholder="Current Password"
              type={changePasswordData?.showOldPassword ? "text" : "password"}
              value={changePasswordData?.oldPassword}
              onChange={(
                event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
              ) => {
                handleChangePasswordData({
                  key: "oldPassword",
                  value: event.target.value,
                });
              }}
              InputProps={{
                endAdornment: (
                  <IconButton
                    onClick={() => {
                      handleChangePasswordData({
                        key: "oldPassword",
                        value: !changePasswordData?.showOldPassword,
                      });
                    }}
                  >
                    {changePasswordData?.showOldPassword ? (
                      <VisibilityIcon />
                    ) : (
                      <VisibilityOffIcon />
                    )}
                  </IconButton>
                ),
              }}
            />
            <TextField
              label="New password"
              size="small"
              placeholder="New Password"
              type={changePasswordData?.showNewPassword ? "text" : "password"}
              onChange={(
                event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
              ) => {
                handleChangePasswordData({
                  key: "newPassword",
                  value: event.target.value,
                });
              }}
              InputProps={{
                endAdornment: (
                  <IconButton
                    onClick={() => {
                      handleChangePasswordData({
                        key: "newPassword",
                        value: !changePasswordData?.newPassword,
                      });
                    }}
                  >
                    {changePasswordData?.newPassword ? (
                      <VisibilityIcon />
                    ) : (
                      <VisibilityOffIcon />
                    )}
                  </IconButton>
                ),
              }}
            />
          </Grid>
          <CustomButton variant="contained">Update</CustomButton>
        </Grid>
      </Container>
    </Grid>
  );
};

export default Settings;
