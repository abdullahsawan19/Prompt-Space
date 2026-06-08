import { useState } from "react";
import { Link } from "react-router-dom";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";

const Navbar = ({
  logoText = "PromptSpace",
  logoPath = "/",
  links = [],
  rightActions = null,
  leftActions = null,
  mobileExtraContent = null,
  className = "",
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`relative z-50 w-full border-b border-[var(--color-grey-100)] bg-[var(--color-grey-0)]/95 backdrop-blur-md transition-colors duration-300 ${className}`}
    >
      <div className="mx-auto flex h-16 md:h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          {leftActions}
          <Link
            to={logoPath}
            onClick={() => {
              window.scrollTo(0, 0);
              handleLinkClick();
            }}
            className="flex flex-shrink-0 items-center gap-2 outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-500)] rounded-md"
          >
            <span className="text-xl font-black text-[var(--color-brand-600)] md:text-2xl tracking-tight">
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
                className="text-[15px] font-medium text-[var(--color-grey-600)] transition-colors duration-200 hover:text-[var(--color-brand-600)]"
              >
                {link.name}
              </a>
            ))}
          </div>
        )}

        <div className="flex items-center gap-2 sm:gap-4">
          <div className="flex items-center gap-2 md:gap-4">{rightActions}</div>

          {links.length > 0 && (
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="ml-1 rounded-lg p-2 text-[var(--color-grey-600)] transition-colors hover:bg-[var(--color-grey-100)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-500)] md:hidden"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <HiOutlineX size={24} />
              ) : (
                <HiOutlineMenu size={24} />
              )}
            </button>
          )}
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full border-b border-[var(--color-grey-100)] bg-[var(--color-grey-0)] shadow-lg md:hidden animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col px-4 py-6 space-y-4 sm:px-6">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.path}
                onClick={handleLinkClick}
                className="block text-base font-semibold text-[var(--color-grey-700)] transition-colors hover:text-[var(--color-brand-600)]"
              >
                {link.name}
              </a>
            ))}

            {mobileExtraContent && (
              <div className="pt-4 mt-2 border-t border-[var(--color-grey-100)]">
                {mobileExtraContent}
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
