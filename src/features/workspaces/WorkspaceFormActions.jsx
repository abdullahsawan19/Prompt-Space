import Button from "../../ui/Button";
import SpinnerMini from "../../ui/SpinnerMini";

const WorkspaceFormActions = ({ isCreating, onCancel }) => {
  return (
    <div className="flex justify-end gap-4 pt-4">
      <Button
        type="button"
        variant="secondary"
        onClick={onCancel}
        disabled={isCreating}
      >
        Cancel
      </Button>

      <Button type="submit" variant="primary" disabled={isCreating}>
        {isCreating ? (
          <>
            Creating... <SpinnerMini />
          </>
        ) : (
          "Create Workspace & Send Invites"
        )}
      </Button>
    </div>
  );
};

export default WorkspaceFormActions;
