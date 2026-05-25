import { Outlet } from "react-router-dom";
import Sidebar from "../ui/Sidebar";
import Navbar from "../ui/Navbar";
import { userLinks } from "../utils/navLinks";
import { HiOutlineMenu } from "react-icons/hi";
import { useEffect, useState } from "react";
import { useUser } from "../features/auth/Auth-Hooks/useUser";
import { ensureUserAndWorkspace } from "../services/auth";

const UserDashboardLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { user } = useUser();

  useEffect(() => {
    if (user) {
      ensureUserAndWorkspace(user);
    }
  }, [user]);

  return (
    <div className="flex h-screen overflow-hidden bg-[var(--color-grey-50)]">
      <Navbar
        className="fixed left-0 top-0 md:hidden"
        rightActions={
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="rounded-lg p-2 text-[var(--color-grey-600)] transition-colors hover:bg-[var(--color-grey-100)]"
          >
            <HiOutlineMenu className="h-6 w-6" />
          </button>
        }
      />

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <div
        className={`fixed inset-y-0 left-0 z-50 transform bg-[var(--color-grey-0)] transition-transform duration-300 ease-in-out md:static md:translate-x-0 ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar
          navigateTo={"/user-dashboard"}
          navItems={userLinks}
          onClose={() => setIsMobileMenuOpen(false)}
        />
      </div>

      <main className="flex-1 overflow-y-auto p-4 pt-20 md:p-8 md:pt-8">
        <div className="mx-auto max-w-6xl">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default UserDashboardLayout;
