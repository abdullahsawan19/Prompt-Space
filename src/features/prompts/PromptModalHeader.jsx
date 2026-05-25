import { HiOutlinePencil } from "react-icons/hi";

export const PromptModalHeader = ({
  isEditing,
  setIsEditing,
  formData,
  handleChange,
}) => (
  <div className="flex items-start justify-between mb-6 gap-4">
    {isEditing ? (
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        className="w-full text-2xl font-bold text-[var(--color-grey-900)] bg-[var(--color-grey-50)] border border-[var(--color-brand-500)] rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[var(--color-brand-200)] transition-all"
        placeholder="Prompt Title"
      />
    ) : (
      <h2 className="text-2xl font-bold text-[var(--color-grey-900)]">
        {formData.title}
      </h2>
    )}

    {!isEditing && (
      <button
        onClick={() => setIsEditing(true)}
        className="p-2 rounded-full text-[var(--color-grey-500)] hover:bg-[var(--color-brand-50)] hover:text-[var(--color-brand-600)] transition-colors"
        title="Edit Prompt"
      >
        <HiOutlinePencil size={20} />
      </button>
    )}
  </div>
);
