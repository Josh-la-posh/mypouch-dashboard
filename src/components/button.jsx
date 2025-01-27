import React from "react";
import PropTypes from "prop-types";

const Button = ({ children, onClick, variant = "primary" }) => {
    const baseClass = "px-4 py-2 rounded-md text-white font-medium";
    const variantClass =
      variant === "primary"
        ? "bg-blue-500 hover:bg-blue-600"
        : "bg-gray-500 hover:bg-gray-600";
  
    return (
      <button className={`${baseClass} ${variantClass}`} onClick={onClick}>
        {children}
      </button>
    );
  };
  
  Button.propTypes = {
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func,
    variant: PropTypes.oneOf(["primary", "secondary"]),
  };

export default Button;
