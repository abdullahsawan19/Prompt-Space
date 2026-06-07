import SpinnerMini from "../../ui/SpinnerMini";
import { useGetDashboardStats } from "./UserDashboard-Hooks/useGetDashboardStats";

const DisplayStats = () => {
  const { stats, isPending } = useGetDashboardStats();
  console.log(stats);

  if (isPending) {
    return (
      <div className="flex items-center justify-center h-32">
        <SpinnerMini />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-[var(--color-grey-0)] border border-[var(--color-grey-200)] rounded-xl p-6 h-32 flex flex-col justify-center items-center text-center shadow-sm">
        <span className="text-[var(--color-grey-500)] text-sm font-semibold uppercase tracking-wider">
          Total Prompts
        </span>
        <span className="text-3xl font-bold text-[var(--color-grey-900)] mt-2">
          {stats.prompts}
        </span>
      </div>
      <div className="bg-[var(--color-grey-0)] border border-[var(--color-grey-200)] rounded-xl p-6 h-32 flex flex-col justify-center items-center text-center shadow-sm">
        <span className="text-[var(--color-grey-500)] text-sm font-semibold uppercase tracking-wider">
          Workspaces
        </span>
        <span className="text-3xl font-bold text-[var(--color-grey-900)] mt-2">
          {stats.workspaces}
        </span>
      </div>
      <div className="bg-[var(--color-grey-0)] border border-[var(--color-grey-200)] rounded-xl p-6 h-32 flex flex-col justify-center items-center text-center shadow-sm">
        <span className="text-[var(--color-grey-500)] text-sm font-semibold uppercase tracking-wider">
          Total Versions
        </span>
        <span className="text-3xl font-bold text-[var(--color-grey-900)] mt-2">
          {stats.versions}
        </span>
      </div>
    </div>
  );
};

export default DisplayStats;
