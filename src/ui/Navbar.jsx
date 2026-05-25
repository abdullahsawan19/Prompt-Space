import { Link } from "react-router-dom";

const Navbar = ({
  logoText = "PromptSpace",
  logoPath = "/",
  links = [],
  rightActions = null,
  leftActions = null,
  className = "",
}) => {
  return (
    <nav
      className={`z-40 w-full border-b border-[var(--color-grey-100)] bg-[var(--color-grey-0)]/95 backdrop-blur-md ${className}`}
    >
      <div className="mx-auto flex h-16 md:h-20 max-w-7xl items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-3">
          {leftActions}
          <Link
            to={logoPath}
            onClick={() => window.scrollTo(0, 0)}
            className="flex flex-shrink-0 items-center gap-2"
          >
            <span className="text-xl md:text-2xl font-black text-[var(--color-brand-600)]">
              {logoText}
            </span>
          </Link>
        </div>

        {links.length > 0 && (
          <div className="hidden items-center gap-8 md:flex lg:gap-10">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.path}
                className="text-[15px] font-semibold text-[var(--color-grey-600)] transition-colors duration-200 hover:text-[var(--color-brand-600)]"
              >
                {link.name}
              </a>
            ))}
          </div>
        )}

        <div className="flex items-center gap-3 md:gap-5">{rightActions}</div>
      </div>
    </nav>
  );
};

export default Navbar;
