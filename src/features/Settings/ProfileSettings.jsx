import { useState, useEffect } from "react";
import Button from "../../ui/Button";
import { useUser } from "../auth/Auth-Hooks/useUser";

import SpinnerMini from "../../ui/SpinnerMini";
import { useUserProfile } from "./Settings-أHooks/useUserProfile";
import { useUpdateProfile } from "./Settings-أHooks/useUpdateProfile";

const ProfileSettings = () => {
  const { user } = useUser();
  const { profile, isPending: isLoadingProfile } = useUserProfile();
  const { updateProfile, isUpdating } = useUpdateProfile();

  const [formData, setFormData] = useState({
    fullName: "",
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        fullName: profile.full_name || "",
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user?.id) return;

    updateProfile({
      userId: user.id,
      fullName: formData.fullName,
    });
  };

  if (isLoadingProfile) {
    return (
      <div className="max-w-2xl flex justify-center py-10">
        <SpinnerMini />
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      <h2 className="text-xl font-bold text-[var(--color-grey-900)] mb-6 pb-4 border-b border-[var(--color-grey-100)]">
        Account Profile
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="fullName"
            className="text-sm font-medium text-[var(--color-grey-700)]"
          >
            Your Name
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter your full name"
            disabled={isUpdating}
            className="w-full px-4 py-2.5 rounded-lg border border-[var(--color-grey-300)] bg-[var(--color-grey-0)] text-[var(--color-grey-900)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-600)] focus:border-transparent transition-shadow disabled:bg-[var(--color-grey-100)] disabled:cursor-not-allowed"
          />
        </div>

        <div className="pt-4">
          <Button type="submit" disabled={isUpdating}>
            {isUpdating ? <SpinnerMini /> : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProfileSettings;
