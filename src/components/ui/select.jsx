import React from "react";
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
        className={`px-3 py-2 focus:outline-none disabled:opacity-50 dark:bg-[#2C2C3E] dark:text-white ${ border ? border : 'border dark:border-gray-300'} ${selectClassName}`}
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
