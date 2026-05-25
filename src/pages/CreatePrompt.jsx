import { useNavigate } from "react-router-dom";
import { HiArrowLeft } from "react-icons/hi";
import CreatePromptForm from "../features/prompts/CreatePromptForm";

const CreatePrompt = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-8 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            title="Go back"
            className="p-2 rounded-lg text-[var(--color-grey-500)] bg-transparent hover:bg-[var(--color-grey-100)] hover:text-[var(--color-grey-900)] transition-colors duration-200"
          >
            <HiArrowLeft size={24} />
          </button>
          <h1 className="text-3xl font-bold text-[var(--color-grey-900)]">
            Create New Prompt
          </h1>
        </div>
      </div>

      <CreatePromptForm />
    </div>
  );
};

export default CreatePrompt;
