import PropTypes from "prop-types";

const InputField = ({ label, placeholder, type = "text", id, value, onChange, required = false, disabled = false, textColor, inputClassName, labelClassName }) => {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className={`text-sm font-[600] ${textColor ? textColor : 'text-black/70 dark:text-white'} ${labelClassName}`} htmlFor={id}>
          {label}
          {required && <span className="text-red-500"> *</span>}
        </label>
      )}
      <input
        type={type}
        id={id}
        name={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required
        className={`text-xs md:text-sm text-black/60 dark:text-white/70 bg-primary/14 border border-gray-300 rounded-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-transparent focus:border-primary dark:text-white placeholder:text-sm placeholder:text-gray-700 placeholder:dark:text-white/40 ${inputClassName}`}
      />
    </div>
  );
};

InputField.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  textColor: PropTypes.string,
  inputClassName: PropTypes.string,
  labelClassName: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default InputField;
