import { HiOutlineSearch } from "react-icons/hi";
import Input from "./Input";

const SearchFilterBar = ({
  searchQuery,
  onSearchChange,
  searchPlaceholder = "Search...",
  filterOptions = [],
  selectedFilter,
  onFilterChange,
  filterLabel = "Filter by:",
  allLabel = "All",
}) => {
  return (
    <div className="flex flex-col gap-3 bg-[var(--color-grey-0)] border border-[var(--color-grey-200)] p-3 rounded-xl shadow-sm">
      <div className="relative flex items-center">
        <HiOutlineSearch
          className="absolute left-3.5 text-[var(--color-grey-400)] pointer-events-none z-10"
          size={20}
        />

        <div className="w-full">
          <Input
            type="text"
            placeholder={searchPlaceholder}
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            style={{ paddingLeft: "2.75rem" }}
          />
        </div>
      </div>

      {filterOptions.length > 0 && (
        <div className="flex items-center gap-2 text-sm overflow-x-auto pb-1 hide-scrollbar">
          <span className="text-[var(--color-grey-500)] font-medium mr-1 shrink-0">
            {filterLabel}
          </span>

          <button
            onClick={() => onFilterChange("all")}
            className={`shrink-0 px-3 py-1 rounded-full text-xs font-semibold transition-all ${
              selectedFilter === "all"
                ? "bg-[var(--color-blue-solid)] text-[var(--color-blue-text)] shadow-sm"
                : "bg-[var(--color-grey-100)] text-[var(--color-grey-600)] hover:bg-[var(--color-grey-200)]"
            }`}
          >
            {allLabel}
          </button>

          {filterOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => onFilterChange(option.id)}
              className={`shrink-0 px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                selectedFilter === option.id
                  ? "bg-[var(--color-blue-solid)] text-[var(--color-blue-text)] shadow-sm"
                  : "bg-[var(--color-grey-100)] text-[var(--color-grey-600)] hover:bg-[var(--color-grey-200)]"
              }`}
            >
              {option.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchFilterBar;
