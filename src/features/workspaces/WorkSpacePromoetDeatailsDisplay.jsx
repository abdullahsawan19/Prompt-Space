import PromptCard from "./PromptCard";
import { useWorkspace } from "./workspaces-Hooks/useWorkspace";

const WorkSpacePromoetDeatailsDisplay = () => {
  const { data: workspace } = useWorkspace();
  const prompts = workspace?.prompts || [];

  if (prompts.length === 0) {
    return (
      <div className="text-center py-16 bg-[var(--color-grey-50)] rounded-2xl border border-[var(--color-grey-200)]">
        <p className="text-[var(--color-grey-500)] mb-4">
          No prompts in this workspace yet.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {prompts.map((prompt) => (
        <PromptCard key={prompt.id} prompt={prompt} />
      ))}
    </div>
  );
};

export default WorkSpacePromoetDeatailsDisplay;
