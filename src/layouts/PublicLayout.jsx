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
        className="rounded-lg p-2.5 text-[var(--color-grey-600)] transition-colors hover:bg-[var(--color-grey-100)]"
      >
        {theme === "light" ? (
          <MdDarkMode size={20} />
        ) : (
          <MdLightMode size={20} />
        )}
      </button>
      <Link
        to="/login"
        className="hidden text-[15px] font-medium text-[var(--color-grey-600)] transition-colors hover:text-[var(--color-brand-600)] sm:block"
      >
        Log in
      </Link>
      <Link
        to="/signup"
        className="rounded-lg bg-[var(--color-brand-600)] px-5 py-2.5 text-[15px] font-semibold text-[#fff] shadow-[var(--shadow-sm)] transition-all hover:bg-[var(--color-brand-500)]"
      >
        Get Started
      </Link>
    </>
  );

  return (
    <div className="flex min-h-screen flex-col bg-[var(--color-grey-50)] text-[var(--color-grey-900)] transition-colors duration-300">
      <Navbar
        links={publicLinks}
        rightActions={publicRightActions}
        className="sticky top-0"
      />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default PublicLayout;
