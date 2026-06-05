import { useForm, Controller } from "react-hook-form";
import { HiOutlinePaperAirplane } from "react-icons/hi";
import toast from "react-hot-toast";
import Input from "../../ui/Input";
import Select from "../../ui/Select";
import Button from "../../ui/Button";
import { useSendInvitation } from "./workspaces-Hooks/useSendInvitation";
import { useParams } from "react-router-dom";
import { useUser } from "../auth/Auth-Hooks/useUser";

const roleOptions = [
  { label: "Viewer", value: "viewer" },
  { label: "Editor", value: "editor" },
];

const InviteMemberForm = ({ onClose }) => {
  const { user } = useUser();
  const { id: workspaceId } = useParams();
  const { mutate: sendInvitation, isPending: isSending } = useSendInvitation();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: { email: "", role: "viewer" },
  });

  const onSubmit = (data) => {
    sendInvitation(
      {
        workspaceId,
        email: data.email,
        role: data.role,
        currentUserId: user.id,
      },
      {
        onSuccess: () => {
          reset();
          onClose?.();
        },
      },
    );
  };

  const onError = (errors) => {
    if (errors.email) toast.error(errors.email.message);
  };

  return (
    <div>
      <h3 className="text-xl font-bold text-[var(--color-grey-800)] mb-6">
        Invite a new member
      </h3>

      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        className="flex flex-col gap-4"
      >
        <div className="w-full">
          <Input
            label="Email Address"
            type="email"
            placeholder="colleague@example.com"
            disabled={isSending}
            {...register("email", {
              required: "Please enter an email address.",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Please enter a valid email address.",
              },
            })}
            error={errors.email?.message}
          />
        </div>

        <div className="w-full">
          <Controller
            name="role"
            control={control}
            render={({ field }) => (
              <Select
                label="Role"
                options={roleOptions}
                value={field.value}
                onChange={field.onChange}
                disabled={isSending}
              />
            )}
          />
        </div>

        <div className="mt-4 flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isSending}
          >
            Cancel
          </Button>

          <Button type="submit" variant="primary" disabled={isSending}>
            <HiOutlinePaperAirplane
              size={20}
              className={isSending ? "animate-pulse" : ""}
            />
            {isSending ? "Sending..." : "Send Invite"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default InviteMemberForm;
