import { useState, useRef, useEffect } from "react";
import { HiChevronDown } from "react-icons/hi";

const Select = ({
  label,
  options = [],
  value,
  onChange,
  placeholder = "Select an option",
  error,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div className={`relative ${className}`} ref={selectRef}>
      {label && (
        <label className="block text-sm font-medium text-[var(--color-grey-700)] mb-1">
          {label}
        </label>
      )}

      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-between w-full px-4 py-2.5 rounded-xl border cursor-pointer bg-[var(--color-grey-50)] transition-all duration-200
          ${error ? "border-red-500" : "border-[var(--color-grey-300)] hover:border-[var(--color-brand-400)]"}
          ${isOpen ? "border-[var(--color-brand-500)] ring-1 ring-[var(--color-brand-500)] shadow-sm" : ""}
        `}
      >
        <span
          className={
            selectedOption
              ? "text-[var(--color-grey-900)]"
              : "text-[var(--color-grey-400)]"
          }
        >
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <HiChevronDown
          size={20}
          className={`text-[var(--color-grey-500)] transition-transform duration-200 ${isOpen ? "rotate-180 text-[var(--color-brand-600)]" : ""}`}
        />
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-[var(--color-grey-0)] border border-[var(--color-grey-200)] rounded-xl shadow-lg overflow-hidden py-1">
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className={`px-4 py-2.5 cursor-pointer text-sm transition-colors
                ${
                  value === option.value
                    ? "bg-[var(--color-brand-50)] text-[var(--color-brand-600)] font-semibold"
                    : "text-[var(--color-grey-700)] hover:bg-[var(--color-grey-50)] hover:text-[var(--color-grey-900)]"
                }
              `}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default Select;
