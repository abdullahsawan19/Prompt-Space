import { NavLink, useNavigate } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { HiX } from "react-icons/hi";
import { useTheme } from "../hooks/useTheme";

const Sidebar = ({ navItems, onClose, navigateTo = "/" }) => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  return (
    <aside className="bg-[var(--color-grey-0)] py-8 px-6 border-r border-[var(--color-grey-100)] flex flex-col h-screen w-64 gap-6">
      <div className="flex items-center justify-between mb-2">
        <h1
          className="text-2xl font-bold text-[var(--color-brand-600)] hover:cursor-pointer"
          onClick={() => navigate(navigateTo)}
        >
          PromptSpace
        </h1>

        <div className="flex items-center gap-1">
          <button
            onClick={toggleTheme}
            title={
              theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"
            }
            className="p-2 rounded-lg text-[var(--color-grey-500)] bg-transparent hover:bg-[var(--color-grey-100)] hover:text-[var(--color-grey-700)] transition-all duration-200 hover:cursor-pointer"
          >
            {theme === "light" ? (
              <MdDarkMode className="w-5 h-5" />
            ) : (
              <MdLightMode className="w-5 h-5" />
            )}
          </button>

          {onClose && (
            <button
              onClick={onClose}
              className="md:hidden p-2 rounded-lg text-[var(--color-grey-500)] bg-transparent hover:bg-[var(--color-grey-100)] hover:text-[var(--color-grey-700)] transition-all duration-200"
            >
              <HiX className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      <nav className="flex-1">
        <ul className="flex flex-col gap-2">
          {navItems.map((link) => (
            <li key={link.name}>
              <NavLink
                to={link.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors duration-200 ${
                    isActive
                      ? "bg-[var(--color-brand-50)] text-[var(--color-brand-600)]"
                      : "text-[var(--color-grey-600)] hover:bg-[var(--color-grey-50)] hover:text-[var(--color-grey-800)]"
                  }`
                }
              >
                <link.icon className="w-6 h-6" />
                <span>{link.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-auto">
        <LogoutButton />
      </div>
    </aside>
  );
};

export default Sidebar;
