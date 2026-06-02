import { HiOutlineFolderOpen, HiOutlineDocumentText } from "react-icons/hi";
import Card from "../../ui/Card";
import Button from "../../ui/Button";

const WorkspaceCard = ({ workspace }) => {
  const { id, name, type, description, prompts } = workspace;

  const safePrompts = prompts || [];
  const previewPrompts = safePrompts.slice(0, 3);
  const remainingCount = safePrompts.length - previewPrompts.length;

  return (
    <Card className="flex flex-col h-full">
      <div className="border-b border-[var(--color-grey-100)] pb-4 mb-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-[var(--color-grey-900)] flex items-center gap-2">
            <HiOutlineFolderOpen className="text-[var(--color-brand-600)]" />
            {name}
          </h3>
          <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-[var(--color-brand-100)] text-[var(--color-brand-700)] rounded-full">
            {type}
          </span>
        </div>
        {description && (
          <p className="text-sm text-[var(--color-grey-500)] line-clamp-2 mt-2">
            {description}
          </p>
        )}
      </div>

      <div className="flex-1 space-y-3 mb-6">
        <div className="flex justify-between items-center text-sm">
          <span className="font-bold text-[var(--color-grey-800)]">
            Latest Prompts
          </span>
          <span className="text-[var(--color-grey-500)]">
            {safePrompts.length} Total
          </span>
        </div>

        {previewPrompts.length > 0 ? (
          <div className="space-y-2">
            {previewPrompts.map((prompt) => (
              <div
                key={prompt.id}
                className="flex items-center gap-2 text-sm text-[var(--color-grey-700)] bg-[var(--color-grey-50)] p-2 rounded-lg border border-[var(--color-grey-200)]"
              >
                <HiOutlineDocumentText className="text-[var(--color-grey-400)] shrink-0" />
                <span className="truncate">{prompt.title}</span>
              </div>
            ))}

            {remainingCount > 0 && (
              <p className="text-xs text-center text-[var(--color-grey-400)] pt-1">
                + {remainingCount} more prompts
              </p>
            )}
          </div>
        ) : (
          <p className="text-sm text-[var(--color-grey-400)] italic text-center py-4 bg-[var(--color-grey-50)] rounded-lg border border-dashed border-[var(--color-grey-200)]">
            Workspace is empty.
          </p>
        )}
      </div>

      <div className="mt-auto pt-4">
        <Button to={`/workspaces/${id}`} variant="outline" className="w-full">
          Open Workspace
        </Button>
      </div>
    </Card>
  );
};

export default WorkspaceCard;
