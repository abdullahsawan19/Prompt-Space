import { useState } from "react";
import PromptDetailModal from "../features/prompts/PromptDetailModal";
import PrompetHeadet from "../ui/PrompetHeadet";
import DisplayPrompets from "../features/prompts/DisplayPrompets";

const Prompts = () => {
  const [selectedPrompt, setSelectedPrompt] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const handleOpenModal = (prompt, editMode = false) => {
    setSelectedPrompt(prompt);
    setIsEditMode(editMode);
  };

  return (
    <div className="flex flex-col gap-8">
      <PrompetHeadet />

      <DisplayPrompets onOpenModal={handleOpenModal} />

      {selectedPrompt && (
        <PromptDetailModal
          prompt={selectedPrompt}
          initialIsEditing={isEditMode}
          onClose={() => setSelectedPrompt(null)}
        />
      )}
    </div>
  );
};

export default Prompts;
