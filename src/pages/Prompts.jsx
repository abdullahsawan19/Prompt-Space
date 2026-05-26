import { useState } from "react";
import PromptDetailModal from "../features/prompts/PromptDetailModal";
import DisplayPrompets from "../features/prompts/DisplayPrompets";
import { useNavigate } from "react-router-dom";
import ReuseableHeader from "../ui/ReuseableHeader";

const Prompts = () => {
  const navigate = useNavigate();

  const [selectedPrompt, setSelectedPrompt] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const handleOpenModal = (prompt, editMode = false) => {
    setSelectedPrompt(prompt);
    setIsEditMode(editMode);
  };

  return (
    <div className="flex flex-col gap-8">
      <ReuseableHeader
        name="My Prompts"
        onClick={() => navigate("/createPrompt")}
        createName="Create Prompt"
      />
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
