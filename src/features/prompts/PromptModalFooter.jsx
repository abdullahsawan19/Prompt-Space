import { HiCheck, HiX } from "react-icons/hi";
import Button from "../../ui/Button";
import SpinnerMini from "../../ui/SpinnerMini";

export const PromptModalFooter = ({
  isEditing,
  isSaving,
  handleCancel,
  handleSave,
  onClose,
}) => (
  <div className="mt-8 pt-4 border-t border-[var(--color-grey-200)]">
    {isEditing ? (
      <div className="flex gap-3 justify-end">
        <Button onClick={handleCancel} variant="secondary" disabled={isSaving}>
          <HiX /> Cancel
        </Button>
        <Button onClick={handleSave} variant="primary" disabled={isSaving}>
          <HiCheck />{" "}
          {isSaving ? (
            <>
              Saving... <SpinnerMini />
            </>
          ) : (
            "Save Changes"
          )}
        </Button>
      </div>
    ) : (
      <Button
        onClick={onClose}
        variant="primary"
        className="w-full !text-white hover:!bg-[var(--color-brand-700)] hover:shadow-md transition-colors duration-200"
      >
        Close
      </Button>
    )}
  </div>
);
