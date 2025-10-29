import PropTypes from "prop-types";
import { useState, useMemo } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const strengthConfig = [
  { label: 'Too Weak', color: 'bg-red-500', score: 0 },
  { label: 'Weak', color: 'bg-orange-500', score: 1 },
  { label: 'Fair', color: 'bg-yellow-500', score: 2 },
  { label: 'Good', color: 'bg-green-500', score: 3 },
  { label: 'Strong', color: 'bg-emerald-600', score: 4 },
];

function evaluateStrength(pwd) {
  if (!pwd) return { score: 0, ...strengthConfig[0] };
  let score = 0;
  if (pwd.length >= 8) score++;
  if (/[A-Z]/.test(pwd)) score++;
  if (/[0-9]/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;
  if (score > 4) score = 4;
  return { score, ...strengthConfig[score] };
}

const InputField = ({ label, placeholder, type = "text", id, value, onChange, required = false, disabled = false, textColor, inputClassName, labelClassName, showToggle = false, showStrength = false }) => {
  const isPassword = type === 'password';
  const [visible, setVisible] = useState(false);
  const inputType = isPassword && showToggle ? (visible ? 'text' : 'password') : type;

  const strength = useMemo(() => (showStrength && isPassword ? evaluateStrength(value) : null), [value, showStrength, isPassword]);

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className={`text-sm font-[600] ${textColor ? textColor : 'text-black/70 dark:text-white'} ${labelClassName}`} htmlFor={id}>
          {label}
          {required && <span className="text-red-500"> *</span>}
        </label>
      )}
      <div className="relative">
        <input
          type={inputType}
          id={id}
          name={id}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          className={`w-full pr-10 text-xs lg:text-sm text-black/60 dark:text-white/70 bg-primary/14 border border-gray-300 rounded-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-transparent focus:border-primary placeholder:text-xs md:placeholder:text-sm placeholder:text-gray-700 placeholder:dark:text-white/40 ${inputClassName}`}
        />
        {isPassword && showToggle && (
          <button
            type="button"
            onClick={() => setVisible(v => !v)}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-primary/70 hover:text-primary"
            aria-label={visible ? 'Hide password' : 'Show password'}
          >
            {visible ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        )}
      </div>
      {strength && (
        <div className="flex items-center gap-3 mt-1">
          <div className="flex gap-1 flex-1">
            {Array.from({ length: 4 }).map((_, idx) => (
              <span
                key={idx}
                className={`h-1 w-full rounded-sm transition-colors ${idx < strength.score ? strength.color : 'bg-gray-300 dark:bg-gray-600'}`}
              />
            ))}
          </div>
          <span className={`text-[10px] font-semibold ${strength.color.replace('bg','text')}`}>{strength.label}</span>
        </div>
      )}
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
  showToggle: PropTypes.bool,
  showStrength: PropTypes.bool,
};

export default InputField;
