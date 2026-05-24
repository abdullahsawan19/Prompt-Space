import { CiLogout } from "react-icons/ci";
import { useLogout } from "../features/auth/Auth-Hooks/useLogout";
import Button from "./Button";
import SpinnerMini from "./SpinnerMini";

const LogoutButton = () => {
  const { mutate: logout, isPending } = useLogout();

  return (
    <Button
      variant="dangerGhost"
      onClick={() => logout()}
      disabled={isPending}
      className="group w-full gap-3"
    >
      {isPending ? (
        <>
          <SpinnerMini />
          <span className="animate-pulse text-red-500 dark:text-red-400">
            Logging out...
          </span>
        </>
      ) : (
        <>
          <CiLogout className="h-6 w-6 transition-transform duration-300 group-hover:translate-x-1" />
          <span>Log Out</span>
        </>
      )}
    </Button>
  );
};

export default LogoutButton;
