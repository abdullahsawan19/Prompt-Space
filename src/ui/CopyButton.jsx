import { useState } from "react";
import { HiOutlineClipboardCopy, HiCheck } from "react-icons/hi";
import { copyToClipboard } from "../utils/helpers";

const CopyButton = ({ textToCopy, className = "" }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    const success = await copyToClipboard(textToCopy);
    if (success) {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      disabled={!textToCopy}
      className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
        isCopied
          ? "bg-[var(--color-brand-100)] text-[var(--color-brand-700)]"
          : "text-[var(--color-grey-500)] hover:bg-[var(--color-grey-100)] hover:text-[var(--color-grey-900)]"
      } ${className}`}
      title="Copy to clipboard"
    >
      {isCopied ? (
        <>
          <HiCheck size={16} /> Copied!
        </>
      ) : (
        <>
          <HiOutlineClipboardCopy size={16} /> Copy
        </>
      )}
    </button>
  );
};

export default CopyButton;
