import { useNavigate } from "react-router-dom";
import { HiArrowLeft, HiOutlineDocumentText } from "react-icons/hi";
import CreatePromptForm from "../features/prompts/CreatePromptForm";

const CreatePrompt = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto mt-4">
      <div className="flex items-start gap-4">
        <button
          onClick={() => navigate(-1)}
          title="Go back"
          className="p-2 mt-1 text-[var(--color-grey-500)] hover:text-[var(--color-brand-600)] hover:bg-[var(--color-grey-100)] rounded-full transition-all outline-none shrink-0"
        >
          <HiArrowLeft size={24} />
        </button>

        <div>
          <h1 className="text-3xl font-bold text-[var(--color-grey-900)] flex items-center gap-3">
            <HiOutlineDocumentText className="text-[var(--color-brand-600)]" />
            Create New Prompt
          </h1>
          <p className="text-[var(--color-grey-500)] mt-2">
            Craft a new prompt and assign it to your personal or team workspace.
          </p>
        </div>
      </div>

      <CreatePromptForm />
    </div>
  );
};

export default CreatePrompt;
