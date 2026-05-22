import { Link } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import { MdDarkMode, MdLightMode } from "react-icons/md";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();

  const navLinks = [
    { name: "Stats", path: "#stats" },
    { name: "Features", path: "#features" },
    { name: "How it Works", path: "#how-it-works" },
    { name: "Audience", path: "#audience" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-[var(--color-grey-200)] bg-[var(--color-grey-0)] opacity-95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link
          to="/"
          onClick={() => window.scrollTo(0, 0)}
          className="flex-shrink-0 flex items-center gap-2"
        >
          <span className="text-2xl font-black text-[var(--color-brand-600)]">
            PromptSpace
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.path}
              className="text-[15px] font-semibold text-[var(--color-grey-600)] transition-all duration-200 hover:text-[var(--color-brand-600)]"
            >
              {link.name}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-5">
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-full hover:bg-[var(--color-grey-100)] text-[var(--color-grey-600)] transition-colors"
          >
            {theme === "light" ? (
              <MdDarkMode size={20} />
            ) : (
              <MdLightMode size={20} />
            )}
          </button>

          <Link
            to="/login"
            className="text-[15px] font-medium text-[var(--color-grey-600)] hover:text-[var(--color-brand-600)] transition-colors"
          >
            Log in
          </Link>
          <Link
            to="/register"
            className="text-[15px] font-semibold px-5 py-2.5 bg-[var(--color-brand-600)] hover:bg-[var(--color-brand-500)] text-[#fff] rounded-full transition-all shadow-[var(--shadow-sm)]"
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
