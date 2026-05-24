import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useLogout } from "../features/auth/Auth-Hooks/useLogout";
import { useUser } from "../features/auth/Auth-Hooks/useUser";

const Dashboard = () => {
  const { mutate: logout, isPending } = useLogout();
  const { hash } = useLocation();
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.is_super_admin) {
      navigate("/admin/stats", { replace: true });
    }
  }, [user, navigate]);

  useEffect(() => {
    if (hash) {
      const timeoutId = setTimeout(() => {
        window.history.replaceState(null, null, window.location.pathname);
      }, 500);

      return () => clearTimeout(timeoutId);
    }
  }, [hash]);

  function handleLogout() {
    logout();
  }
  return (
    <button onClick={handleLogout} disabled={isPending}>
      {isPending ? "Logging out..." : "Log Out"}
    </button>
  );
};

export default Dashboard;
