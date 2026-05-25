import { useQuery } from "@tanstack/react-query";
import { getPrompts } from "../../../services/apiPrompts";

export function usePrompts() {
  const {
    isLoading,
    data: prompts,
    error,
  } = useQuery({
    queryKey: ["prompts"],
    queryFn: getPrompts,
  });

  return { isLoading, error, prompts };
}
