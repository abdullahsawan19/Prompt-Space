import { HiOutlineTrash } from "react-icons/hi";
import CopyButton from "../../ui/CopyButton";
import toast from "react-hot-toast";
import { useDeleteVersion } from "./workspaces-Hooks/useDeleteVersion";

const PromptVersionItem = ({ prompt, version }) => {
  const { deleteVersion, isDeletingVersion } = useDeleteVersion();

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    if (prompt.prompt_versions.length <= 1) {
      toast.error("You cannot delete the only version of a prompt!");
      return;
    }
    if (window.confirm("Are you sure? This action cannot be undone.")) {
      deleteVersion(version.id);
    }
  };

  return (
    <div className="bg-[var(--color-grey-0)] border border-[var(--color-grey-200)] rounded-xl p-4 sm:p-5 relative shadow-sm transition-all">
      <div className="flex justify-between items-center mb-3 pb-3 border-b border-[var(--color-grey-100)]">
        <span className="inline-flex items-center justify-center px-3 py-1 bg-[var(--color-grey-100)] text-[var(--color-grey-800)] text-sm font-bold rounded-full">
          v{version.version_number}
        </span>

        <div className="flex items-center gap-2">
          <CopyButton textToCopy={version.content} />
          <button
            onClick={handleDeleteClick}
            disabled={isDeletingVersion}
            className="text-[var(--color-grey-400)] hover:text-red-500 transition-colors p-1.5 rounded-lg hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed"
            title="Delete version"
          >
            <HiOutlineTrash size={18} />
          </button>
        </div>
      </div>

      <div className="text-[15px] leading-relaxed text-[var(--color-grey-800)] whitespace-pre-wrap break-words font-sans">
        {version.content}
      </div>
    </div>
  );
};

export default PromptVersionItem;
