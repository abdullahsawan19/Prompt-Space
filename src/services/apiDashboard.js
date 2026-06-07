import { supabase } from "../config/supabase";

export async function getDashboardStats(userId) {
  if (!userId) throw new Error("User ID is required");

  const workspacesReq = supabase
    .from("workspace_members")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId);

  const promptsReq = supabase
    .from("prompts")
    .select("*", { count: "exact", head: true })
    .eq("is_archived", false);

  const versionsReq = supabase
    .from("prompt_versions")
    .select("*", { count: "exact", head: true });

  const [workspacesRes, promptsRes, versionsRes] = await Promise.all([
    workspacesReq,
    promptsReq,
    versionsReq,
  ]);

  if (workspacesRes.error) throw workspacesRes.error;
  if (promptsRes.error) throw promptsRes.error;
  if (versionsRes.error) throw versionsRes.error;

  return {
    workspaces: workspacesRes.count || 0,
    prompts: promptsRes.count || 0,
    versions: versionsRes.count || 0,
  };
}
