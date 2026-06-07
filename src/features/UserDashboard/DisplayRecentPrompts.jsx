import { HiOutlineDocumentText, HiOutlineClock } from "react-icons/hi";
import { formatRecentDate } from "../../utils/helpers";
import { useNavigate } from "react-router-dom";

const DisplayRecentPrompts = ({ recentPrompets }) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-3">
      {recentPrompets.map((prompt) => (
        <div
          onClick={() => navigate(`/workspaces/${prompt.workspace_id}`)}
          key={prompt.id}
          className="flex items-center justify-between p-3 border border-[var(--color-grey-200)] rounded-lg bg-[var(--color-grey-0)] hover:bg-[var(--color-grey-50)] transition-colors"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="p-2 bg-[var(--color-grey-100)] text-[var(--color-brand-600)] rounded-md shrink-0">
              <HiOutlineDocumentText size={20} />
            </div>
            <div className="min-w-0">
              <p
                className="font-bold text-[var(--color-grey-900)] text-sm truncate max-w-[120px] sm:max-w-[200px] md:max-w-[250px]"
                title={`Prompt Title : ${prompt.title}`}
              >
                Prompt Title : {prompt.title}
              </p>
              <p
                className="text-xs text-[var(--color-grey-500)] truncate mt-0.5 max-w-[120px] sm:max-w-[200px] md:max-w-[250px]"
                title={`Work Space Name : ${prompt.workspaces?.name}`}
              >
                Work Space Name : {prompt.workspaces?.name}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-[var(--color-grey-400)] text-xs shrink-0 pl-2">
            <HiOutlineClock size={14} />
            <span>{formatRecentDate(prompt.created_at)}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DisplayRecentPrompts;
