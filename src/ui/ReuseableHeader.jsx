import { HiOutlinePlus, HiOutlineStar, HiOutlineUser } from "react-icons/hi";
import Button from "./Button";

const ReuseableHeader = ({
  name = "Prompt Space",
  currentUserRole,
  personName,
  onClick = () => {},
  createName = "Create",
  secondOnClick,
  secondCreateName,
  type,
  description = "",
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 w-full border-b border-[var(--color-grey-200)] pb-4 mb-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-[var(--color-grey-900)] flex items-center gap-3 flex-wrap">
          {name}
          {personName && `, ${personName} `}

          {type && (
            <span className="px-3 py-1 text-sm font-semibold uppercase tracking-wider bg-[var(--color-blue-solid)] text-[var(--color-blue-text)] rounded-full">
              {type}
            </span>
          )}

          {currentUserRole &&
            (currentUserRole === "owner" ? (
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[var(--color-brand-100)] text-[var(--color-brand-700)] border border-[var(--color-brand-200)] shadow-sm cursor-default">
                <HiOutlineStar
                  size={14}
                  className="text-[var(--color-brand-600)]"
                />
                Owner
              </span>
            ) : (
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[var(--color-grey-100)] text-[var(--color-grey-700)] border border-[var(--color-grey-200)] shadow-sm cursor-default">
                <HiOutlineUser
                  size={14}
                  className="text-[var(--color-grey-500)]"
                />
                {currentUserRole}
              </span>
            ))}
        </h1>

        {description && (
          <p className="text-[var(--color-grey-500)] max-w-2xl">
            {description}
          </p>
        )}
      </div>

      <div className="flex items-center gap-3 shrink-0">
        {secondCreateName && (
          <Button
            onClick={secondOnClick}
            variant="outline"
            className="flex items-center gap-2"
          >
            <HiOutlinePlus size={20} />
            {secondCreateName}
          </Button>
        )}

        {createName && (
          <Button onClick={onClick} className="flex items-center gap-2">
            <HiOutlinePlus size={20} />
            {createName}
          </Button>
        )}
      </div>
    </div>
  );
};

export default ReuseableHeader;
