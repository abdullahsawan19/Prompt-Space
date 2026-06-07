import { supabase } from "../config/supabase";
import {
  getSevenDaysAgo,
  formatChartDate,
  getPastDate,
} from "../utils/helpers";

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
export async function getAreaChartData(userId) {
  if (!userId) throw new Error("User ID is required");

  const sevenDaysAgo = getSevenDaysAgo();

  const { data, error } = await supabase
    .from("prompts")
    .select("created_at")
    .gte("created_at", sevenDaysAgo)
    .eq("created_by", userId)
    .eq("is_archived", false);

  if (error) throw new Error("Could not fetch activity data");

  const groupedData = data.reduce((acc, prompt) => {
    const date = formatChartDate(prompt.created_at);
    if (!acc[date]) {
      acc[date] = { date, prompts: 0 };
    }
    acc[date].prompts += 1;
    return acc;
  }, {});

  const last7Days = Array.from({ length: 7 }).map((_, i) => {
    const date = formatChartDate(getPastDate(6 - i));
    return groupedData[date] || { date, prompts: 0 };
  });

  return last7Days;
}

export async function getPieChartData(userId) {
  if (!userId) throw new Error("User ID is required");

  const { data, error } = await supabase
    .from("workspace_members")
    .select(
      `
      workspaces ( type )
    `,
    )
    .eq("user_id", userId);

  if (error) throw new Error("Could not fetch workspace types");

  const typeCount = data.reduce((acc, item) => {
    const type = item.workspaces?.type;
    if (type) {
      acc[type] = (acc[type] || 0) + 1;
    }
    return acc;
  }, {});

  const chartData = Object.keys(typeCount).map((key) => ({
    name: key.charAt(0).toUpperCase() + key.slice(1),
    value: typeCount[key],
  }));

  return chartData;
}
