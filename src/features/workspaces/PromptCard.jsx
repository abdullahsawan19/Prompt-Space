import { useState } from "react";
import {
  HiOutlineDocumentText,
  HiOutlineChevronDown,
  HiOutlineChevronUp,
  HiOutlinePencil,
  HiOutlineTrash,
} from "react-icons/hi";
import { useDeletePrompt } from "../prompts/prompts-Hooks/useDeletePrompt";
import SpinnerMini from "../../ui/SpinnerMini";
import PromptVersionItem from "./PromptVersionItem";
import PromptEditForm from "./PromptEditForm";

const PromptCard = ({ prompt }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { mutate: deletePromptMutation, isPending: isDeletingPrompt } =
    useDeletePrompt();

  const versionsCount = prompt.prompt_versions?.length || 0;
  const sortedVersions = [...(prompt.prompt_versions || [])].sort(
    (a, b) => b.version_number - a.version_number,
  );

  const togglePrompt = () => {
    setIsOpen((prev) => !prev);
    if (isOpen) setIsEditing(false);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this prompt?")) {
      deletePromptMutation(prompt.id);
    }
  };

  const handleStartEdit = (e) => {
    e.stopPropagation();
    setIsEditing(true);
    setIsOpen(true);
  };

  return (
    <div className="bg-[var(--color-grey-0)] border border-[var(--color-grey-200)] rounded-xl shadow-sm overflow-hidden transition-all duration-300">
      <div
        onClick={togglePrompt}
        className="p-4 flex items-center justify-between cursor-pointer hover:bg-[var(--color-grey-50)] transition-colors group"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[var(--color-brand-50)] text-[var(--color-brand-600)] rounded-lg">
            <HiOutlineDocumentText size={24} />
          </div>
          <div>
            <h3 className="font-bold text-lg text-[var(--color-grey-900)]">
              {prompt.title}
            </h3>
            <p className="text-sm text-[var(--color-grey-500)] mt-0.5">
              {versionsCount} {versionsCount === 1 ? "Version" : "Versions"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div
            className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleStartEdit}
              className="text-[var(--color-grey-400)] hover:text-[var(--color-brand-600)] transition-colors outline-none"
              title="Edit latest version"
            >
              <HiOutlinePencil size={20} />
            </button>
            <button
              onClick={handleDelete}
              disabled={isDeletingPrompt}
              className="text-[var(--color-grey-400)] hover:text-red-500 transition-colors outline-none"
              title="Delete Prompt"
            >
              {isDeletingPrompt ? (
                <SpinnerMini />
              ) : (
                <HiOutlineTrash size={20} />
              )}
            </button>
          </div>
          <div className="text-[var(--color-grey-400)] border-l border-[var(--color-grey-200)] pl-4">
            {isOpen ? (
              <HiOutlineChevronUp size={24} />
            ) : (
              <HiOutlineChevronDown size={24} />
            )}
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="border-t border-[var(--color-grey-100)] bg-[var(--color-grey-50)] p-4 sm:p-6 space-y-6">
          {versionsCount === 0 && isEditing ? (
            <PromptEditForm
              prompt={prompt}
              version={{ content: "", version_number: "New" }}
              onCancel={() => setIsEditing(false)}
            />
          ) : versionsCount === 0 ? (
            <p className="text-sm text-[var(--color-grey-500)] italic text-center py-4">
              No versions found.
            </p>
          ) : (
            sortedVersions.map((version, index) => {
              const isLatest = index === 0;
              if (isLatest && isEditing) {
                return (
                  <PromptEditForm
                    key={version.id}
                    prompt={prompt}
                    version={version}
                    onCancel={() => setIsEditing(false)}
                  />
                );
              }
              return (
                <PromptVersionItem
                  key={version.id}
                  prompt={prompt}
                  version={version}
                />
              );
            })
          )}
        </div>
      )}
    </div>
  );
};

export default PromptCard;
