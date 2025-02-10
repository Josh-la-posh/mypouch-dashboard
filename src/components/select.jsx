import React from "react";
import PropTypes from "prop-types";

const SelectField = ({ label, options, value, onChange, placeholder = "Select an option", disabled = false, labelClassName, className, selectClassName }) => {
  return (
    <div className={`flex flex-col gap-2 ${className} `}>
      {label && <label className={`text-sm font-medium text-gray-700 ${labelClassName}`}>{label}</label>}
      <select
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`px-3 py-2 focus:outline-none disabled:opacity-50 ${selectClassName}`}
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
