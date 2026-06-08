import { HiOutlineDocumentText } from "react-icons/hi";
import { useGetRecentPrompts } from "./UserDashboard-Hooks/usegetRecentPrompts";
import SpinnerMini from "../../ui/SpinnerMini";
import DisplayRecentPrompts from "./DisplayRecentPrompts";

const RecentPrompts = () => {
  const { recentPrompets, isPending } = useGetRecentPrompts();

  return (
    <div className="bg-[var(--color-grey-0)] border border-[var(--color-grey-200)] rounded-xl p-6 shadow-sm flex flex-col h-[400px]">
      <h2 className="text-lg font-bold text-[var(--color-grey-800)] mb-4 border-b border-[var(--color-grey-100)] pb-4">
        Recent Prompts
      </h2>

      <div className="flex-1 flex flex-col overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
        {isPending ? (
          <div className="flex-1 flex items-center justify-center">
            <SpinnerMini />
          </div>
        ) : recentPrompets?.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-[var(--color-grey-400)] text-center py-8">
            <div className="w-16 h-16 bg-[var(--color-grey-50)] rounded-full flex items-center justify-center mb-4">
              <HiOutlineDocumentText
                size={32}
                className="text-[var(--color-grey-300)]"
              />
            </div>
            <p className="font-medium text-[var(--color-grey-500)]">
              No recent prompts.
            </p>
            <p className="text-sm mt-1">
              Your latest activity will appear here.
            </p>
          </div>
        ) : (
          <DisplayRecentPrompts recentPrompets={recentPrompets} />
        )}
      </div>
    </div>
  );
};

export default RecentPrompts;
