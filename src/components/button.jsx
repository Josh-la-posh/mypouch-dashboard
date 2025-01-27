import React from "react";
import PropTypes from "prop-types";
import { Button as MuiButton } from "@mui/material";

const Button = ({ children, onClick, variant = "contained", color = "primary" }) => {
  return (
    <MuiButton variant={variant} color={color} onClick={onClick}>
      {children}
    </MuiButton>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(["text", "outlined", "contained"]),
  color: PropTypes.string,
};

export default Button;
