import { useQuery } from "@tanstack/react-query";
import { getMyPendingInvitations } from "../../../services/apiInvitations";
import { useUser } from "../../auth/Auth-Hooks/useUser";

export function useGetmyInvitations() {
  const { user } = useUser();

  const { data: MyInvitations = [], isPending: MyInvitationsPending } =
    useQuery({
      queryKey: ["myInvitations", user?.email],
      queryFn: () => getMyPendingInvitations(user?.email),
      enabled: !!user?.email,
    });

  return { MyInvitations, MyInvitationsPending };
}
