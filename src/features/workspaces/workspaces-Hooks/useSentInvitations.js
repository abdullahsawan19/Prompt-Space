import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  getSentInvitations,
  PAGE_SIZE,
} from "../../../services/apiInvitations";
import { useParams, useSearchParams } from "react-router-dom";

export function useSentInvitations() {
  const { id: workspaceId } = useParams();
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  const filterStatus = searchParams.get("status") || "all";
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const {
    isFetching,
    isPending,
    data: { data: sentInvitations, count } = {},
    error,
  } = useQuery({
    queryKey: ["sentInvitations", workspaceId, filterStatus, page],
    queryFn: () => getSentInvitations({ workspaceId, filterStatus, page }),
    enabled: !!workspaceId,
    placeholderData: keepPreviousData,
  });

  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["sentInvitations", workspaceId, filterStatus, page + 1],
      queryFn: () =>
        getSentInvitations({ workspaceId, filterStatus, page: page + 1 }),
    });
  }

  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ["sentInvitations", workspaceId, filterStatus, page - 1],
      queryFn: () =>
        getSentInvitations({ workspaceId, filterStatus, page: page - 1 }),
    });
  }

  return { isPending, isFetching, sentInvitations, count, error };
}
