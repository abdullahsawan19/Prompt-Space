const SpinnerMini = ({ className = "" }) => {
  return (
    <svg
      className={`animate-spin h-5 w-5 text-[var(--color-brand-600)] ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="2"
      ></circle>

      <path
        className="opacity-75"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        d="M12 2a10 10 0 0 1 10 10"
      ></path>
    </svg>
  );
};

export default SpinnerMini;
