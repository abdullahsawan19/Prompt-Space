import { useState } from "react";
import Button from "../../ui/Button";
import SpinnerMini from "../../ui/SpinnerMini";
import { useEditPrompt } from "../prompts/prompts-Hooks/useEditPrompt";

const PromptEditForm = ({ prompt, version, onCancel }) => {
  const [editContent, setEditContent] = useState(version.content || "");
  const { mutate: editPromptMutation, isPending: isSaving } = useEditPrompt();

  const handleSaveEdit = () => {
    if (editContent.trim() === (version.content || "").trim()) {
      onCancel();
      return;
    }
    editPromptMutation({
      promptId: prompt.id,
      title: prompt.title,
      description: prompt.description,
      content: editContent,
    });
    onCancel();
  };

  return (
    <div className="bg-[var(--color-grey-0)] border border-[var(--color-brand-400)] ring-1 ring-[var(--color-brand-100)] rounded-xl p-4 sm:p-5 relative shadow-sm transition-all">
      <div className="flex justify-between items-center mb-3 pb-3 border-b border-[var(--color-grey-100)]">
        <span className="inline-flex items-center justify-center px-3 py-1 bg-[var(--color-grey-100)] text-[var(--color-grey-800)] text-sm font-bold rounded-full">
          Editing v{version.version_number}
        </span>
      </div>
      <div className="flex flex-col gap-3">
        <textarea
          value={editContent}
          onChange={(e) => setEditContent(e.target.value)}
          className="w-full min-h-[250px] p-3 text-[15px] text-[var(--color-grey-900)] bg-[var(--color-grey-50)] border border-[var(--color-grey-300)] focus:border-[var(--color-brand-500)] focus:ring-1 focus:ring-[var(--color-brand-500)] rounded-lg outline-none resize-y custom-scrollbar font-sans"
          autoFocus
        />
        <div className="flex justify-end gap-3 mt-2">
          <Button variant="outline" onClick={onCancel} disabled={isSaving}>
            Cancel
          </Button>
          <Button onClick={handleSaveEdit} disabled={isSaving}>
            {isSaving ? <SpinnerMini /> : "Save Version"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PromptEditForm;
