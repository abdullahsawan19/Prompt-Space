const Header = ({ title, subtitle, className = "text-center" }) => {
  return (
    <div className={`mb-8 w-full ${className}`}>
      <h2 className="text-3xl md:text-5xl font-black text-[var(--color-grey-900)] transition-colors leading-tight">
        {title}
      </h2>
      <p className="mt-4 text-lg text-[var(--color-grey-500)] transition-colors">
        {subtitle}
      </p>
    </div>
  );
};

export default Header;
