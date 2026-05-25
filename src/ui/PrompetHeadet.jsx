import { HiOutlinePlus } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

const PrompetHeadet = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between border-b border-[var(--color-grey-200)] pb-4">
      <h1 className="text-3xl font-bold text-[var(--color-grey-900)]">
        My Prompts
      </h1>
      <Button onClick={() => navigate("/createPrompt")}>
        <HiOutlinePlus size={20} /> Create Prompt
      </Button>
    </div>
  );
};

export default PrompetHeadet;
