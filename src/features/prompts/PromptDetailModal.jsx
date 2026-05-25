import { useState } from "react";
import { useEditPrompt } from "./prompts-Hooks/useEditPrompt";
import { PromptModalHeader } from "./PromptModalHeader";
import { PromptModalBody } from "./PromptModalBody";
import { PromptModalFooter } from "./PromptModalFooter";

const PromptDetailModal = ({ prompt, initialIsEditing = false, onClose }) => {
  const [isEditing, setIsEditing] = useState(initialIsEditing);
  const { mutate: editPrompt, isPending: isSaving } = useEditPrompt();

  const getLatestContent = () => {
    if (!prompt.prompt_versions || prompt.prompt_versions.length === 0)
      return "";
    const sortedVersions = [...prompt.prompt_versions].sort(
      (a, b) => b.version_number - a.version_number,
    );
    return sortedVersions[0].content;
  };

  const [formData, setFormData] = useState({
    title: prompt.title || "",
    description: prompt.description || "",
    content: getLatestContent(),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCancel = () => {
    setFormData({
      title: prompt.title || "",
      description: prompt.description || "",
      content: getLatestContent(),
    });
    setIsEditing(false);
  };

  const handleSave = () => {
    editPrompt(
      {
        promptId: prompt.id,
        title: formData.title,
        description: formData.description,
        content: formData.content,
      },
      { onSuccess: () => setIsEditing(false) },
    );
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 transition-all"
      onClick={onClose}
    >
      <div
        className="bg-[var(--color-grey-0)] border border-[var(--color-grey-200)] p-6 rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <PromptModalHeader
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          formData={formData}
          handleChange={handleChange}
        />

        <PromptModalBody
          isEditing={isEditing}
          formData={formData}
          handleChange={handleChange}
          prompt={prompt}
        />

        <PromptModalFooter
          isEditing={isEditing}
          isSaving={isSaving}
          handleCancel={handleCancel}
          handleSave={handleSave}
          onClose={onClose}
        />
      </div>
    </div>
  );
};

export default PromptDetailModal;
