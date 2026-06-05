import { HiChevronDown, HiOutlineUserAdd } from "react-icons/hi";

const TableOpenButton = ({ isOpen, setIsOpen, count, isPending }) => {
  return (
    <div>
      {" "}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 focus:outline-none hover:bg-[var(--color-grey-50)] transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[var(--color-brand-50)] text-[var(--color-brand-600)] rounded-lg">
            <HiOutlineUserAdd size={20} />
          </div>

          <h3 className="font-bold text-[var(--color-grey-800)]">
            Invitations
          </h3>
          {!isPending && count > 0 && (
            <span className="bg-[var(--color-grey-100)] text-[var(--color-grey-700)] text-xs font-bold px-2.5 py-0.5 rounded-full border border-[var(--color-grey-200)]">
              {count}
            </span>
          )}
        </div>
        <HiChevronDown
          className={`text-[var(--color-grey-500)] transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
          size={20}
        />
      </button>
    </div>
  );
};

export default TableOpenButton;
