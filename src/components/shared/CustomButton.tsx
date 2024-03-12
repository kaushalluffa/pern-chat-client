import { Button, ButtonProps, CircularProgress } from "@mui/material";
import React from "react";
interface CustomButtonProps extends ButtonProps {
  loading?: boolean;
}
const CustomButton = ({ loading, children, ...rest }: CustomButtonProps) => {
  return <Button {...rest}>{loading ? <CircularProgress /> : children}</Button>;
};

export default CustomButton;
