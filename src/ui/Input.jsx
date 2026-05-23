import { forwardRef, useState } from "react";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";

const Input = forwardRef(
  ({ label, error, type, className = "", ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    const isPassword = type === "password";

    return (
      <div className={className}>
        {label && (
          <label className="block text-sm font-medium text-[var(--color-grey-700)] mb-1">
            {label}
          </label>
        )}

        <div className="relative">
          <input
            ref={ref}
            type={isPassword && showPassword ? "text" : type}
            className={`w-full px-4 py-2.5 rounded-xl border ${
              error ? "border-red-500" : "border-[var(--color-grey-300)]"
            } focus:outline-none focus:border-[var(--color-brand-500)] focus:ring-1 focus:ring-[var(--color-brand-500)] bg-transparent text-[var(--color-grey-900)] transition-colors ${
              isPassword ? "pr-12" : ""
            }`}
            {...props}
          />

          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--color-grey-400)] hover:text-[var(--color-brand-600)] transition-colors focus:outline-none"
            >
              {showPassword ? (
                <MdOutlineVisibilityOff size={22} />
              ) : (
                <MdOutlineVisibility size={22} />
              )}
            </button>
          )}
        </div>

        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
