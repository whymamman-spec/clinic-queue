/**
 * Reusable Button Component
 *
 * Props:
 * - children: Text or elements displayed inside the button
 * - variant: Controls the visual style
 * - type: Button type (button, submit, reset)
 * - onClick: Function executed when clicked
 * - disabled: Disables the button when true
 */

function Button({
  children,
  variant = "primary",
  type = "button",
  onClick,
  disabled = false,
  className = "",
  ...props
}) {
  // Base classes shared by all button variants
  const baseClasses =
    "px-6 py-3 rounded-lg font-medium transition duration-200 focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed";

  // Variant-specific styles
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-300",

    secondary: "bg-teal-600 text-white hover:bg-teal-700 focus:ring-teal-300",

    outline:
      "border border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-300",

    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-300",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
