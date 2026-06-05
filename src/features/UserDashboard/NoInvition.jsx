import { HiOutlineOfficeBuilding } from "react-icons/hi";

const NoInvition = () => {
  return (
    <div>
      {" "}
      <div className="flex-1 flex flex-col items-center justify-center text-[var(--color-grey-400)] text-center p-6">
        <div className="w-16 h-16 bg-[var(--color-grey-50)] rounded-full flex items-center justify-center mb-4">
          <HiOutlineOfficeBuilding
            size={32}
            className="text-[var(--color-grey-300)]"
          />
        </div>
        <p className="font-medium text-[var(--color-grey-500)]">
          You have no pending invitations.
        </p>
        <p className="text-sm mt-1">
          When someone invites you to their workspace, it will appear here.
        </p>
      </div>
    </div>
  );
};

export default NoInvition;
