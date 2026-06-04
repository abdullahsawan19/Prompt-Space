import SpinnerMini from "../../ui/SpinnerMini";
import { usePrompts } from "../prompts/prompts-Hooks/usePrompts";
import { useWorkspaces } from "../workspaces/workspaces-Hooks/useWorkspaces";

const DisplayStats = () => {
  const { isLoading: isPending, prompts } = usePrompts();
  const { isLoading, workspaces } = useWorkspaces();

  console.log(workspaces);
  console.log(prompts);

  if (isLoading || isPending) {
    return (
      <div>
        <SpinnerMini />
      </div>
    );
  }

  const totalVersions =
    prompts?.reduce((acc, prompt) => {
      return acc + (prompt.prompt_versions?.length || 0);
    }, 0) || 0;
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-[var(--color-grey-0)] border border-[var(--color-grey-200)] rounded-xl p-6 h-32 flex flex-col justify-center items-center text-center shadow-sm">
        <span className="text-[var(--color-grey-500)] text-sm font-semibold uppercase tracking-wider">
          Total Prompts
        </span>
        <span className="text-3xl font-bold text-[var(--color-grey-900)] mt-2">
          {prompts.length || 0}{" "}
        </span>
      </div>
      <div className="bg-[var(--color-grey-0)] border border-[var(--color-grey-200)] rounded-xl p-6 h-32 flex flex-col justify-center items-center text-center shadow-sm">
        <span className="text-[var(--color-grey-500)] text-sm font-semibold uppercase tracking-wider">
          Workspaces
        </span>
        <span className="text-3xl font-bold text-[var(--color-grey-900)] mt-2">
          {workspaces.length || 0}{" "}
        </span>
      </div>
      <div className="bg-[var(--color-grey-0)] border border-[var(--color-grey-200)] rounded-xl p-6 h-32 flex flex-col justify-center items-center text-center shadow-sm">
        <span className="text-[var(--color-grey-500)] text-sm font-semibold uppercase tracking-wider">
          Total Versions
        </span>
        <span className="text-3xl font-bold text-[var(--color-grey-900)] mt-2">
          {totalVersions || 0}
        </span>
      </div>
    </div>
  );
};

export default DisplayStats;
