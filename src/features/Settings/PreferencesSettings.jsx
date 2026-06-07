import { useState, useEffect } from "react";
import { useUser } from "../auth/Auth-Hooks/useUser";
import SpinnerMini from "../../ui/SpinnerMini";
import { useUpdatePreferences } from "./Settings-أHooks/useUpdatePreferences";
import { useUserProfile } from "./Settings-أHooks/useUserProfile";

const PreferencesSettings = () => {
  const { user } = useUser();
  const { profile, isPending } = useUserProfile();
  const { updatePreferences, isUpdating } = useUpdatePreferences();

  const [acceptsInvitations, setAcceptsInvitations] = useState(true);

  useEffect(() => {
    if (profile !== undefined) {
      setAcceptsInvitations(profile.accepts_invitations);
    }
  }, [profile]);

  const handleToggle = () => {
    const newValue = !acceptsInvitations;
    setAcceptsInvitations(newValue);

    updatePreferences({
      userId: user.id,
      acceptsInvitations: newValue,
    });
  };

  if (isPending) {
    return (
      <div className="max-w-2xl flex justify-center py-10">
        <SpinnerMini />
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      <h2 className="text-xl font-bold text-[var(--color-grey-900)] mb-6 pb-4 border-b border-[var(--color-grey-100)]">
        Preferences
      </h2>

      <div className="flex items-center justify-between p-4 border border-[var(--color-grey-200)] rounded-lg bg-[var(--color-grey-50)]">
        <div className="flex flex-col">
          <span className="font-semibold text-[var(--color-grey-800)]">
            Workspace Invitations
          </span>
          <span className="text-sm text-[var(--color-grey-500)] mt-1">
            Allow other users to invite you to their workspaces via email.
          </span>
        </div>

        <button
          type="button"
          onClick={handleToggle}
          disabled={isUpdating}
          className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-600)] focus:ring-offset-2 disabled:opacity-50 ${
            acceptsInvitations
              ? "bg-[var(--color-brand-600)]"
              : "bg-[var(--color-grey-300)]"
          }`}
          role="switch"
          aria-checked={acceptsInvitations}
        >
          <span
            aria-hidden="true"
            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
              acceptsInvitations ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </button>
      </div>
    </div>
  );
};

export default PreferencesSettings;
