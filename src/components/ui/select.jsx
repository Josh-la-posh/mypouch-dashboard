import PropTypes from "prop-types";

const SelectField = ({ label, options, value, onChange, textColor, placeholder = "Select an option", disabled = false, labelClassName, className, selectClassName, border }) => {
  // Normalize options: can be array of strings or array of {label,value}
  const normalized = Array.isArray(options) ? options.map(opt => {
    if (opt && typeof opt === 'object' && 'value' in opt) {
      return { label: opt.label ?? String(opt.value), value: opt.value };
    }
    // primitive string/number
    return { label: String(opt), value: String(opt) };
  }) : [];
  return (
    <div className={`flex flex-col gap-2 ${className} `}>
      {label && <label className={`text-sm font-[600] ${textColor ? textColor : 'text-slate-700 dark:text-slate-200'} ${labelClassName}`}>{label}</label>}
      <select
        id={label ? `${label.replace(/\s+/g,'-').toLowerCase()}-select` : undefined}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`text-xs lg:text-sm border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-100 ${border ? border : ''} ${selectClassName}`}
      >
        <option value="" disabled>{placeholder}</option>
        {normalized.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
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
  options: PropTypes.array.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
};

export default SelectField;
