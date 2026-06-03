import { HiOutlinePlus } from "react-icons/hi";
import Button from "./Button";

const ReuseableHeader = ({
  name = "Prompt Space",
  onClick = () => {},
  createName = "Create",
  type,
  description = "",
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 w-full border-b border-[var(--color-grey-200)] pb-4 mb-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-[var(--color-grey-900)] flex items-center gap-3 flex-wrap">
          {name}
          {type && (
            <span className="px-3 py-1 text-sm font-semibold uppercase tracking-wider bg-[var(--color-blue-solid)] text-[var(--color-blue-text)] rounded-full">
              {type}
            </span>
          )}
        </h1>
        {description && (
          <p className="text-[var(--color-grey-500)] max-w-2xl">
            {description}
          </p>
        )}
      </div>
      {createName && (
        <Button onClick={onClick} className="shrink-0 flex items-center gap-2">
          <HiOutlinePlus size={20} />
          {createName}
        </Button>
      )}
    </div>
  );
};

export default ReuseableHeader;
