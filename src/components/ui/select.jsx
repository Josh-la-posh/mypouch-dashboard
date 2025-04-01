import PropTypes from "prop-types";

const SelectField = ({ label, options, value, onChange, textColor, placeholder = "Select an option", disabled = false, labelClassName, className, selectClassName, border }) => {
  return (
    <div className={`flex flex-col gap-2 ${className} `}>
      {label && <label className={`text-sm font-[600] ${textColor ? textColor : 'text-gray-700 dark:text-white'} ${labelClassName}`}>{label}</label>}
      <select
        id={options}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`text-xs md:text-sm border border-gray-300 rounded-sm px-3 py-2 focus:outline-none disabled:opacity-50 bg-primary/14 text-black/60 dark:text-white/70 ${ border ? border : 'border dark:border-gray-300'} ${selectClassName}`}
      >
        <option value="" disabled>{placeholder}</option>
          {options.map((option) => (
          <option key={option} value={option}>
            {option}
        </option>
        ))}
      </select>
    </div>
  );
};

SelectField.propTypes = {
  label: PropTypes.string,
  className: PropTypes.string,
  textColor: PropTypes.string,
  labelClassName: PropTypes.string,
  selectClassName: PropTypes.string,
  border: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired
    })
  ).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
};

export default SelectField;
