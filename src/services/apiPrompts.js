import { supabase } from "../config/supabase";

export async function getPrompts() {
  const { data, error } = await supabase
    .from("prompts")
    .select(
      `
      *,
      prompt_versions (
        content,
        version_number
      ),
      prompt_tags (
        tags (
          name
        )
      )
    `,
    )
    .eq("is_archived", false)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching prompts:", error);
    throw new Error("Prompts could not be loaded");
  }

  return data;
}
