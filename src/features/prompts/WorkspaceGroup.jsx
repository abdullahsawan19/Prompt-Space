import { HiOutlineFolderOpen } from "react-icons/hi";
import Card from "../../ui/Card";
import PromptCardActions from "../../ui/PromptCardActions";

const WorkspaceGroup = ({
  workspace,
  navigate,
  onOpenModal,
  handleDelete,
  isPending,
}) => {
  const isClickable = workspace.id !== "unassigned";

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center w-full mb-2 mt-4">
        <div className="h-px flex-1 bg-[var(--color-grey-200)]"></div>
        <div
          onClick={() => isClickable && navigate(`/workspaces/${workspace.id}`)}
          className={`flex items-center gap-2 mx-4 transition-all duration-200 ${
            isClickable ? "cursor-pointer group" : ""
          }`}
        >
          <HiOutlineFolderOpen
            className={`text-[var(--color-brand-600)] ${
              isClickable
                ? "group-hover:scale-110 group-hover:text-[var(--color-brand-700)] transition-transform"
                : ""
            }`}
            size={24}
          />
          <h2
            className={`text-xl font-bold text-[var(--color-grey-800)] ${
              isClickable
                ? "group-hover:text-[var(--color-brand-600)] transition-colors"
                : ""
            }`}
          >
            {workspace.name}
          </h2>
          {workspace.type === "personal" && (
            <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full bg-[var(--color-grey-200)] text-[var(--color-grey-600)]">
              Personal
            </span>
          )}
        </div>
        <div className="h-px flex-1 bg-[var(--color-grey-200)]"></div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {workspace.prompts.map((prompt) => (
          <Card key={prompt.id} className="relative flex flex-col gap-3">
            <PromptCardActions
              prompt={prompt}
              onOpenModal={onOpenModal}
              deletePrompt={handleDelete}
              isPending={isPending}
            />
            <h3 className="font-bold text-lg text-[var(--color-grey-900)] pr-20 truncate mt-1">
              {prompt.title}
            </h3>
            <p className="text-sm text-[var(--color-grey-500)] line-clamp-2">
              {prompt.description || "No description provided."}
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default WorkspaceGroup;
