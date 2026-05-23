import { Link } from "react-router-dom";

const Button = ({
  children,
  to,
  variant = "primary",
  size = "md",
  className = "",
  disabled = false,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-semibold rounded-full transition-all duration-300";

  const variants = {
    primary:
      "bg-[var(--color-brand-600)] text-[#fff] shadow-[var(--shadow-sm)]",
    secondary: "bg-[var(--color-grey-100)] text-[var(--color-grey-900)]",
    outline:
      "border border-[var(--color-grey-300)] text-[var(--color-grey-700)] bg-transparent",
  };

  const hoverStyles = {
    primary:
      "hover:bg-[var(--color-brand-500)] hover:shadow-[var(--shadow-md)] hover:-translate-y-0.5",
    secondary: "hover:bg-[var(--color-grey-200)] hover:-translate-y-0.5",
    outline: "hover:bg-[var(--color-grey-50)] hover:-translate-y-0.5",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-[15px]",
    lg: "px-8 py-4 text-lg",
  };

  const stateStyles = disabled
    ? "opacity-60 cursor-not-allowed"
    : `cursor-pointer ${hoverStyles[variant]}`;

  const combinedClassName = `${baseStyles} ${variants[variant]} ${sizes[size]} ${stateStyles} ${className}`;

  if (to && !disabled) {
    return (
      <Link to={to} className={combinedClassName} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button disabled={disabled} className={combinedClassName} {...props}>
      {children}
    </button>
  );
};

export default Button;
