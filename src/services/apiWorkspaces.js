import { supabase } from "../config/supabase";

export async function getWorkspaces(userId) {
  if (!userId) throw new Error("User ID is required");

  const { data, error } = await supabase
    .from("workspace_members")
    .select(
      `
      workspaces (
        id,
        name,
        type
      )
    `,
    )
    .eq("user_id", userId);

  if (error) throw new Error("Workspaces could not be loaded");

  const uniqueWorkspaces = Array.from(
    new Map(data.map((item) => [item.workspaces.id, item.workspaces])).values(),
  );

  return uniqueWorkspaces;
}
