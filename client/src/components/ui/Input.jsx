/**
 * Input Component
 *
 * Reusable form input with an optional label.
 */

function Input({
  label,
  type = "text",
  placeholder = "",
  value,
  onChange,
  name,
  required = false,
  className = "",
  ...props
}) {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label htmlFor={name} className="font-medium text-slate-700">
          {label}
        </label>
      )}

      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className={`
    w-full
    rounded-lg
    border
    border-slate-300
    px-4
    py-3
    focus:border-blue-500
    focus:ring-2
    focus:ring-blue-200
    outline-none
    transition
    ${className}
  `}
        {...props}
      />
    </div>
  );
}

export default Input;
