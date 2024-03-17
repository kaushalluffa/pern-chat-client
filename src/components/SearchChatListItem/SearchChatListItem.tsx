import { SearchChatListItemProps } from "@/utils/types";
import { Search } from "@mui/icons-material";
import { IconButton, ListItem, TextField, useTheme } from "@mui/material";
import React from "react";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const SearchChatListItem = (props?: SearchChatListItemProps) => {
  const theme = useTheme();
  return (
    <ListItem>
      <TextField
        placeholder="Search chats"
        size="small"
        fullWidth
        variant="outlined"
        sx={{
          "& .MuiInput-underline:after": {
            borderBottomColor: theme.palette.divider,
          },
          "& .MuiOutlinedInput-root": {
            borderRadius: 4,
            color: theme.palette.text.secondary,
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
        InputProps={{
          endAdornment: (
            <IconButton
              sx={{
                color: theme.palette.primary.main,
              }}
            >
              <Search />
            </IconButton>
          ),
        }}
      />
    </ListItem>
  );
};

export default SearchChatListItem;
