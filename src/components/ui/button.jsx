import PropTypes from "prop-types";

const Button = ({ children, onClick, variant = "primary", className, disabled }) => {
    const baseClass = "w-full px-4 py-2 rounded-xs font-[700] text-xl";
    const variantClass =
      variant === "primary"
        ? "bg-primary dark:bg-primary hover:bg-primary-dark dark:hover:bg-primary-light text-white dark:text-white dark:hover:text-primary text-xs sm:text-sm"
        : variant === "secondary"
        ? "bg-primary hover:bg-primary-dark text-white text-xs sm:text-sm"
        : variant === "outline"
        ? "bg-tranparent hover:bg-primary-dark dark:hover:bg-primary text-primary hover:text-white border border-primary text-xs sm:text-sm"
        : variant === "danger"
        ? "text-danger border border-danger hover:bg-danger hover:text-white text-xs sm:text-sm"
        : "";
  
    return (
      <button className={`${baseClass} ${variantClass} ${className} cursor-pointer`} onClick={onClick} disabled={disabled}>
        {children}
      </button>
    );
  };
  
  Button.propTypes = {
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func,
    variant: PropTypes.oneOf(["primary", "secondary", "danger", "outline", "custom"]),
    className: PropTypes.string,
    disabled: PropTypes.bool
  };

export default Button;
