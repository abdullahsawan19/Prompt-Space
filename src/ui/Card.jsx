const Card = ({ children, className = "" }) => {
  return (
    <div
      className={`p-8 bg-[var(--color-grey-0)] border border-[var(--color-grey-200)] rounded-2xl shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] hover:-translate-y-1 transition-all duration-300 ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
