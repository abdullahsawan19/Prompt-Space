import { HiOutlinePlus } from "react-icons/hi";
import Button from "./Button";

const ReuseableHeader = ({
  name = "Prompt Space",
  onClick = () => {},
  createName = "Create",
}) => {
  return (
    <div className="flex items-center justify-between border-b border-[var(--color-grey-200)] pb-4">
      <h1 className="text-3xl font-bold text-[var(--color-grey-900)]">
        {name}
      </h1>
      <Button onClick={onClick}>
        <HiOutlinePlus size={20} />
        {createName}
      </Button>
    </div>
  );
};

export default ReuseableHeader;
