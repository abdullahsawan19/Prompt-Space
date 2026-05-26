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

export async function createWorkspace({ name, type, description, invites }) {
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();
  if (authError || !user) throw new Error("User not authenticated");

  const { data: newWorkspace, error: workspaceError } = await supabase
    .from("workspaces")
    .insert([
      {
        name,
        type,
        description,
        owner_id: user.id,
      },
    ])
    .select()
    .single();

  if (workspaceError) {
    console.error("Error creating workspace:", workspaceError);
    throw new Error("Could not create the workspace.");
  }

  const { error: memberError } = await supabase
    .from("workspace_members")
    .insert([
      {
        workspace_id: newWorkspace.id,
        user_id: user.id,
        role: "owner",
      },
    ]);

  if (memberError) {
    await supabase.from("workspaces").delete().eq("id", newWorkspace.id);
    console.error("Error adding owner to members:", memberError);
    throw new Error("Could not complete workspace setup.");
  }

  if (invites && invites.length > 0) {
    const invitationsData = invites.map((invite) => ({
      workspace_id: newWorkspace.id,
      email: invite.email,
      role: invite.role,
      invited_by: user.id,
      status: "pending",
    }));

    const { error: invitesError } = await supabase
      .from("workspace_invitations")
      .insert(invitationsData);

    if (invitesError) {
      console.error(
        "Warning: Workspace created, but failed to send some invites:",
        invitesError,
      );
    }
  }

  return newWorkspace;
}
