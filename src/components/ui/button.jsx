import React from "react";
import PropTypes from "prop-types";

const Button = ({ children, onClick, variant = "primary", className, disabled }) => {
    const baseClass = "w-full px-4 py-2 rounded-xs font-[700] text-xl";
    const variantClass =
      variant === "primary"
        ? "bg-primary-dark hover:bg-primary-light text-white hover:text-primary"
        : variant === "secondary"
        ? "bg-primary hover:bg-primary-dark text-white"
        : variant === "danger"
        ? "text-danger border border-danger hover:bg-danger hover:text-white"
        : "bg-green-500 hover:bg-gray-600";
  
    return (
      <button className={`${baseClass} ${variantClass} ${className} cursor-pointer`} onClick={onClick} disabled={disabled}>
        {children}
      </button>
    );
  };
  
  Button.propTypes = {
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func,
    variant: PropTypes.oneOf(["primary", "secondary", "danger"]),
    className: PropTypes.any,
    disabled: PropTypes.bool
  };

export default Button;
