import { TextField, TextFieldProps, useTheme } from "@mui/material";
import React from "react";

const CustomTextField = (props: TextFieldProps) => {
  const theme = useTheme();
  return (
    <TextField
      {...props}
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
  );
};

export default CustomTextField;
