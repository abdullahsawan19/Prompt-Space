import { useState } from "react";
import { useFieldArray } from "react-hook-form";
import { HiOutlinePlus, HiOutlineTrash } from "react-icons/hi";
import Input from "../../ui/Input";
import Select from "../../ui/Select";
import Button from "../../ui/Button";
import toast from "react-hot-toast";

const roleOptions = [
  { label: "Viewer", value: "viewer" },
  { label: "Editor", value: "editor" },
];

const WorkspaceInvitesSection = ({ control, isCreating }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "invites",
  });

  const [currentEmail, setCurrentEmail] = useState("");
  const [currentRole, setCurrentRole] = useState("viewer");

  const handleAddInvite = () => {
    if (!currentEmail) return;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(currentEmail)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (fields.find((inv) => inv.email === currentEmail)) {
      toast.error("This email is already in the list!");
      return;
    }

    append({ email: currentEmail, role: currentRole });
    setCurrentEmail("");
    setCurrentRole("viewer");
  };

  return (
    <div className="bg-[var(--color-grey-0)] border border-[var(--color-grey-200)] p-8 rounded-2xl shadow-sm space-y-6 animate-fade-in">
      <h2 className="text-xl font-bold text-[var(--color-grey-800)] border-b border-[var(--color-grey-100)] pb-4">
        2. Invite Team Members{" "}
        <span className="text-sm font-normal text-[var(--color-grey-400)]">
          (Optional)
        </span>
      </h2>

      <div className="flex flex-col md:flex-row gap-3 items-end">
        <div className="flex-1 w-full">
          <Input
            label="Email Address"
            type="email"
            value={currentEmail}
            onChange={(e) => setCurrentEmail(e.target.value)}
            placeholder="colleague@example.com"
            disabled={isCreating}
          />
        </div>

        <div className="w-full md:w-48 space-y-1">
          <Select
            label="Role"
            options={roleOptions}
            value={currentRole}
            onChange={(val) => setCurrentRole(val)}
            disabled={isCreating}
          />
        </div>

        <Button
          onClick={handleAddInvite}
          type="button"
          variant="secondary"
          className="h-[46px]"
          disabled={isCreating}
        >
          <HiOutlinePlus size={20} /> Add
        </Button>
      </div>

      {fields.length > 0 && (
        <div className="mt-6 border border-[var(--color-grey-200)] rounded-xl overflow-hidden">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className={`flex items-center justify-between p-4 ${index !== fields.length - 1 ? "border-b border-[var(--color-grey-200)]" : ""} bg-[var(--color-grey-50)]`}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[var(--color-brand-100)] text-[var(--color-brand-600)] flex items-center justify-center font-bold text-sm uppercase">
                  {field.email.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-bold text-[var(--color-grey-900)]">
                    {field.email}
                  </p>
                  <p className="text-xs font-semibold text-[var(--color-grey-500)] uppercase tracking-wider">
                    {field.role}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => remove(index)}
                className="p-2 text-[var(--color-grey-400)] hover:text-red-500 transition-colors focus:outline-none"
                disabled={isCreating}
              >
                <HiOutlineTrash size={18} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WorkspaceInvitesSection;
