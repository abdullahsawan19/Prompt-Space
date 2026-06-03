import { HiOutlinePencil, HiEye, HiOutlineTrash } from "react-icons/hi";
import SpinnerMini from "./SpinnerMini";

const PromptCardActions = ({
  prompt,
  onOpenModal,
  deletePrompt,
  isPending,
}) => {
  return (
    <div className="flex items-center gap-3">
      <button
        onClick={(e) => {
          e.stopPropagation();
          onOpenModal(prompt, true);
        }}
        className="text-[var(--color-grey-400)] hover:text-[var(--color-brand-600)] transition-colors outline-none cursor-pointer"
        title="Edit Prompt"
      >
        <HiOutlinePencil size={20} />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onOpenModal(prompt, false);
        }}
        className="text-[var(--color-grey-400)] hover:text-[var(--color-brand-600)] transition-colors outline-none cursor-pointer"
        title="View Details"
      >
        <HiEye size={20} />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          deletePrompt(prompt.id);
        }}
        className="text-[var(--color-grey-400)] hover:text-red-500 transition-colors outline-none cursor-pointer"
        title="Delete Prompt"
        disabled={isPending}
      >
        {isPending ? <SpinnerMini /> : <HiOutlineTrash size={20} />}
      </button>
    </div>
  );
};

export default PromptCardActions;
