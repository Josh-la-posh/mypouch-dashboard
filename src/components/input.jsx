import React from "react";
import PropTypes from "prop-types";

const InputField = ({ label, placeholder, type = "text", id, value, onChange, required = false, textColor }) => {
  return (
    <div className="flex flex-col gap-2 mb-4">
      {label && (
        <label className={`text-sm font-[600] ${textColor ? textColor : 'text-gray-700'}`} htmlFor={id}>
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
        required
        className={`border border-gray-300 rounded-sm p-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${textColor ? textColor : 'text-gray-700'} placeholder:${textColor ? textColor : 'text-gray-700'}`}
      />
    </div>
  );
};

InputField.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
};

export default InputField;
