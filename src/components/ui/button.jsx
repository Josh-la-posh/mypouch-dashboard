import PropTypes from "prop-types";

const Button = ({ children, onClick, variant = "primary", className, disabled }) => {
    const baseClass = "w-full px-4 py-2 rounded-lg font-[700] text-xl transition-colors disabled:opacity-60 disabled:cursor-not-allowed";
    const variantClass =
      variant === "primary"
        ? "bg-primary hover:bg-primary-dark text-white text-xs sm:text-sm"
        : variant === "secondary"
        ? "bg-slate-600 hover:bg-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600 text-white text-xs sm:text-sm"
        : variant === "outline"
        ? "bg-transparent hover:bg-primary-dark dark:hover:bg-primary text-primary hover:text-white border border-primary text-xs sm:text-sm"
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
