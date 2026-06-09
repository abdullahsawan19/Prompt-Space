import { Outlet, Link } from "react-router-dom";
import Navbar from "../ui/Navbar";
import Footer from "../ui/Footer";
import { useTheme } from "../hooks/useTheme";
import { MdDarkMode, MdLightMode } from "react-icons/md";

const publicLinks = [
  { name: "Stats", path: "#stats" },
  { name: "Features", path: "#features" },
  { name: "How it Works", path: "#how-it-works" },
  { name: "Audience", path: "#audience" },
];

const PublicLayout = () => {
  const { theme, toggleTheme } = useTheme();

  const publicRightActions = (
    <>
      <button
        onClick={toggleTheme}
        className="rounded-lg p-2.5 text-[var(--color-grey-600)] transition-colors hover:bg-[var(--color-grey-100)] outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-500)]"
        aria-label="Toggle dark mode"
      >
        {theme === "light" ? (
          <MdDarkMode size={22} />
        ) : (
          <MdLightMode size={22} />
        )}
      </button>

      <Link
        to="/login"
        className="hidden md:block text-[15px] font-semibold text-[var(--color-grey-600)] transition-colors hover:text-[var(--color-brand-600)] outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-500)] rounded-md px-2 py-1"
      >
        Log in
      </Link>

      <Link
        to="/signup"
        className="rounded-lg bg-[var(--color-brand-600)] px-4 sm:px-5 py-2 sm:py-2.5 text-[14px] sm:text-[15px] font-semibold text-[#fff] shadow-[var(--shadow-sm)] transition-all hover:bg-[var(--color-brand-500)] outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-brand-600)]"
      >
        Get Started
      </Link>
    </>
  );

  const mobileMenuExtraContent = (
    <Link
      to="/login"
      className="flex w-full items-center justify-center rounded-lg bg-[var(--color-grey-100)] px-4 py-3 text-base font-semibold text-[var(--color-grey-900)] transition-colors hover:bg-[var(--color-grey-200)]"
    >
      Log in
    </Link>
  );

  return (
    <div className="flex min-h-screen flex-col bg-[var(--color-grey-50)] text-[var(--color-grey-900)] transition-colors duration-300">
      <Navbar
        links={publicLinks}
        rightActions={publicRightActions}
        mobileExtraContent={mobileMenuExtraContent}
        className="!sticky top-0 z-50"
      />

      <main className="flex-grow flex flex-col">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default PublicLayout;
