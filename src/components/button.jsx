import React from "react";
import PropTypes from "prop-types";

const Button = ({ children, onClick, variant = "primary" }) => {
    const baseClass = "w-full px-4 py-2 rounded-sm font-[700] text-xl";
    const variantClass =
      variant === "primary"
        ? "bg-primary-light hover:bg-primary-dark text-primary hover:text-white"
        : "bg-green-500 hover:bg-gray-600";
  
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
