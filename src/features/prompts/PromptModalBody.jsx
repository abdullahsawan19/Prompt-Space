import { HiOutlineClock } from "react-icons/hi";
import CopyButton from "../../ui/CopyButton";

export const PromptModalBody = ({
  isEditing,
  formData,
  handleChange,
  prompt,
}) => {
  return (
    <div className="space-y-6 overflow-y-auto pr-2 custom-scrollbar flex-1">
      {/* Description Section */}
      <div>
        <label className="block text-xs font-semibold text-[var(--color-grey-500)] uppercase mb-2">
          Description
        </label>
        {isEditing ? (
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="2"
            className="w-full text-[var(--color-grey-700)] bg-[var(--color-grey-50)] border border-[var(--color-grey-300)] rounded-lg px-3 py-2 outline-none focus:border-[var(--color-brand-500)] focus:ring-2 focus:ring-[var(--color-brand-200)] transition-all resize-none"
            placeholder="Briefly describe what this prompt does..."
          />
        ) : (
          <p className="text-[var(--color-grey-700)]">
            {formData.description || "No description"}
          </p>
        )}
      </div>

      {/* Content Section */}
      <div className="flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <label className="text-xs font-semibold text-[var(--color-grey-500)] uppercase">
              Content
            </label>

            {/* زرار عرض الفيرجنات (تجهيز للمستقبل) */}
            {!isEditing && prompt.prompt_versions?.length > 1 && (
              <button
                className="flex items-center gap-1 text-[10px] uppercase font-bold text-[var(--color-brand-600)] bg-[var(--color-brand-50)] px-2 py-0.5 rounded-full hover:bg-[var(--color-brand-100)] transition-colors"
                title="View previous versions"
              >
                <HiOutlineClock size={12} />
                {prompt.prompt_versions.length} Versions
              </button>
            )}
          </div>

          {!isEditing && <CopyButton textToCopy={formData.content} />}
        </div>

        {isEditing ? (
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            className="w-full flex-1 min-h-[250px] text-[var(--color-grey-800)] bg-[var(--color-grey-50)] border border-[var(--color-grey-300)] rounded-xl p-4 font-mono text-sm outline-none focus:border-[var(--color-brand-500)] focus:ring-2 focus:ring-[var(--color-brand-200)] transition-all resize-y"
            placeholder="Write your prompt content here..."
          />
        ) : (
          <div className="p-4 bg-[var(--color-grey-50)] rounded-xl border border-[var(--color-grey-100)] text-[var(--color-grey-800)] whitespace-pre-wrap break-words w-full font-mono text-sm selection:bg-[var(--color-brand-200)]">
            {formData.content || "No content"}
          </div>
        )}
      </div>
    </div>
  );
};
