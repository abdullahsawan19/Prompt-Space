import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useUser } from "./Auth-Hooks/useUser";

const ProtectedRoute = ({ allowedRoles }) => {
  const { isLoading, isAuthenticated, user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/login", { replace: true });
      return;
    }

    if (!isLoading && isAuthenticated && allowedRoles) {
      const isSuperAdmin = user?.is_super_admin === true;

      if (allowedRoles.includes("super_admin") && !isSuperAdmin) {
        navigate("/dashboard", { replace: true });
      }
    }
  }, [isLoading, isAuthenticated, user, navigate, allowedRoles]);

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-[var(--color-grey-50)]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-brand-600)]"></div>
      </div>
    );
  }

  return isAuthenticated ? <Outlet /> : null;
};

export default ProtectedRoute;
