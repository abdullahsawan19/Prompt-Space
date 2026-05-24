import { useLogout } from "../features/auth/Auth-Hooks/useLogout";

const AdminDashboardLayout = () => {
  const { mutate: logout, isPending } = useLogout();

  function handelLogout() {
    logout();
  }
  return <button onClick={handelLogout}> Log out</button>;
};

export default AdminDashboardLayout;
