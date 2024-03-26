import { Grid, IconButton, Toolbar, Typography, useTheme } from "@mui/material";
import React, { useState } from "react";
import SettingIcon from "@mui/icons-material/Settings";
import { Home } from "@mui/icons-material";
import { useAuthContext } from "@/contexts/AuthContext";
import SettingsMenu from "./SettingsMenu";

const ChatListHeader = ({ handleGoToHome }: { handleGoToHome: () => void }) => {
  const theme = useTheme();
  const { loggedInUser } = useAuthContext();
  const [settingsAnchorEl, setSettingsAnchorEl] = useState<HTMLElement | null>(
    null
  );
  return (
    <Toolbar>
      <Grid container justifyContent="space-between" alignItems="center">
        <Typography variant="h5" color={theme.palette.text.secondary}>
          Hi, {loggedInUser?.user?.name ?? ""}
        </Typography>
        <Grid item display="flex" alignItems="center" gap={1}>
          <IconButton
            disableRipple
            sx={{
              bgcolor: theme.palette.primary.main,
              color: theme.palette.common.white,
            }}
            onClick={() => {
              handleGoToHome();
            }}
          >
            <Home />
          </IconButton>

          <IconButton
            disableRipple
            sx={{
              bgcolor: theme.palette.primary.main,
              color: theme.palette.common.white,
            }}
            onClick={(e) => setSettingsAnchorEl(e.currentTarget)}
          >
            <SettingIcon />
          </IconButton>
        </Grid>
      </Grid>
      <SettingsMenu
        setSettingsAnchorEl={setSettingsAnchorEl}
        settingsAnchorEl={settingsAnchorEl}
      />
    </Toolbar>
  );
};

export default ChatListHeader;
