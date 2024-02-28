import { SearchChatListItemProps } from "@/utils/types";
import { Search } from "@mui/icons-material";
import { IconButton, ListItem, TextField } from "@mui/material";
import React from "react";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const SearchChatListItem = (props?: SearchChatListItemProps) => {
  return (
    <ListItem>
      <TextField
        placeholder="Search chats"
        size="small"
        fullWidth
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: 4,
          },
        }}
        InputProps={{
          endAdornment: (
            <IconButton
              sx={{
                color: `#615EF0`,
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
