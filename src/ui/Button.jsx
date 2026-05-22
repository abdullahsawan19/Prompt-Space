import { Link } from "react-router-dom";

const Button = ({
  children,
  to,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-semibold rounded-full transition-all duration-200 cursor-pointer";

  const variants = {
    primary:
      "bg-[var(--color-brand-600)] hover:bg-[var(--color-brand-500)] text-[#fff] shadow-[var(--shadow-md)]",
    secondary:
      "bg-[var(--color-grey-100)] hover:bg-[var(--color-grey-200)] text-[var(--color-grey-900)]",
    outline:
      "border border-[var(--color-grey-300)] hover:bg-[var(--color-grey-50)] text-[var(--color-grey-700)]",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-[15px]",
    lg: "px-8 py-4 text-lg",
  };

  const combinedClassName = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={combinedClassName} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button className={combinedClassName} {...props}>
      {children}
    </button>
  );
};

export default Button;
