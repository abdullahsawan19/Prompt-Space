import { Outlet, Link } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import { MdDarkMode, MdLightMode } from "react-icons/md";

const FormsLayout = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-grey-50)] transition-colors duration-300">
      <header className="w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <Link
          to="/"
          className="text-2xl font-black text-[var(--color-brand-600)]"
        >
          PromptSpace
        </Link>
        <button
          onClick={toggleTheme}
          className="p-2.5 rounded-full bg-[var(--color-grey-0)] border border-[var(--color-grey-200)] text-[var(--color-grey-600)] hover:text-[var(--color-brand-600)] shadow-[var(--shadow-sm)] transition-all duration-300"
        >
          {theme === "light" ? (
            <MdDarkMode size={20} />
          ) : (
            <MdLightMode size={20} />
          )}
        </button>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-4 pb-20">
        <Outlet />
      </main>
    </div>
  );
};

export default FormsLayout;
