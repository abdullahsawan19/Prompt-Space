import { supabase } from "../config/supabase";

export async function getPrompts() {
  const { data, error } = await supabase
    .from("prompts")
    .select(
      `
      *,
      workspaces (
        id,
        name,
        type
      ),
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

export async function editPrompt({ promptId, title, description, content }) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("User not authenticated");

  const { error: updateError } = await supabase
    .from("prompts")
    .update({ title, description, updated_at: new Date().toISOString() })
    .eq("id", promptId);

  if (updateError) throw new Error("Could not update prompt details");

  const { data: latestVersion, error: versionFetchError } = await supabase
    .from("prompt_versions")
    .select("version_number, content")
    .eq("prompt_id", promptId)
    .order("version_number", { ascending: false })
    .limit(1)
    .single();

  if (versionFetchError) throw new Error("Could not fetch latest version");

  if (latestVersion.content !== content) {
    const { error: versionInsertError } = await supabase
      .from("prompt_versions")
      .insert([
        {
          prompt_id: promptId,
          content: content,
          version_number: latestVersion.version_number + 1,
          edited_by: user.id,
        },
      ]);

    if (versionInsertError) throw new Error("Could not save new version");
  }

  return true;
}

export async function createPrompt(promptData) {
  const { data: newPrompt, error: promptError } = await supabase
    .from("prompts")
    .insert([
      {
        title: promptData.title,
        description: promptData.description,
        workspace_id: promptData.workspace_id,
        created_by: promptData.user_id,
      },
    ])
    .select()
    .single();

  if (promptError) {
    console.error("Error creating prompt:", promptError);
    throw new Error("Could not create the prompt");
  }

  const { error: versionError } = await supabase
    .from("prompt_versions")
    .insert([
      {
        prompt_id: newPrompt.id,
        version_number: 1,
        content: promptData.content,
        edited_by: promptData.user_id,
      },
    ]);

  if (versionError) {
    console.error("Error creating prompt version:", versionError);
    await supabase.from("prompts").delete().eq("id", newPrompt.id);
    throw new Error("Could not save the prompt content");
  }

  return newPrompt;
}

export async function deletePrompt(promptId) {
  const { error } = await supabase.from("prompts").delete().eq("id", promptId);

  if (error) {
    console.error("Error deleting prompt:", error);
    throw new Error("Prompt could not be deleted");
  }

  return true;
}

export async function deleteVersion(versionId) {
  const { error } = await supabase
    .from("prompt_versions")
    .delete()
    .eq("id", versionId);

  if (error) {
    console.error("Error deleting version:", error);
    throw new Error("Failed to delete version");
  }

  return true;
}
