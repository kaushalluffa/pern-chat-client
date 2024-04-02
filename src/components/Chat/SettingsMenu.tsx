import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Popover,
  useTheme,
} from "@mui/material";
import React from "react";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { Contrast, Logout } from "@mui/icons-material";
import useAuth from "@/hooks/useAuth";
import { useThemeContext } from "@/hooks/useAllContextHooks";

const SettingsMenu = ({
  settingsAnchorEl,
  setSettingsAnchorEl,
}: {
  settingsAnchorEl: HTMLElement | null;
  setSettingsAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
}) => {
  const theme = useTheme();
  const { mode, handleSetTheme } = useThemeContext();
  const { logout } = useAuth();

  if (settingsAnchorEl) {
    return (
      <Popover
        open={Boolean(settingsAnchorEl)}
        anchorEl={settingsAnchorEl}
        onClose={() => {
          setSettingsAnchorEl(null);
        }}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <ListItem>
          <ListItemButton
            onClick={() => {
              handleSetTheme(mode === "light" ? "dark" : "light");
            }}
          >
            <ListItemIcon>
              {mode === "light" ? <DarkModeIcon /> : <Contrast />}
            </ListItemIcon>
            <ListItemText
              primaryTypographyProps={{ color: theme.palette.text.secondary }}
            >
              Switch to {mode === "light" ? "dark" : "light"} mode
            </ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton
            onClick={() => {
              logout();
            }}
          >
            <ListItemIcon>
              <Logout />
            </ListItemIcon>
            <ListItemText
              primaryTypographyProps={{ color: theme.palette.text.secondary }}
            >
              Logout
            </ListItemText>
          </ListItemButton>
        </ListItem>
      </Popover>
    );
  }
  return null;
};

export default SettingsMenu;
