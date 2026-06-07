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
        type,
        description,
        created_at, 
        prompts (
          id,
          title,
          created_at
        )
      )
    `,
    )
    .eq("user_id", userId);

  if (error) {
    console.error("Error fetching workspaces:", error);
    throw new Error("Workspaces could not be loaded");
  }

  const uniqueWorkspaces = Array.from(
    new Map(data.map((item) => [item.workspaces.id, item.workspaces])).values(),
  )
    .map((workspace) => {
      if (workspace.prompts && workspace.prompts.length > 0) {
        workspace.prompts.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at),
        );
      }
      return workspace;
    })
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  return uniqueWorkspaces;
}

export async function getSimpleWorkspaces(userId) {
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

  if (error) {
    console.error("Error fetching simple workspaces for dropdown:", error);
    throw new Error("Workspaces list could not be loaded");
  }

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
    const emailsToInvite = invites.map((invite) => invite.email);

    const { data: optedOutUsers, error: checkError } = await supabase
      .from("users")
      .select("email")
      .in("email", emailsToInvite)
      .eq("accepts_invitations", false);

    if (checkError) {
      console.error("Error checking user preferences:", checkError);
    }

    const optedOutEmails = new Set(optedOutUsers?.map((u) => u.email) || []);
    const validInvites = invites.filter(
      (invite) => !optedOutEmails.has(invite.email),
    );

    if (validInvites.length > 0) {
      const invitationsData = validInvites.map((invite) => ({
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
  }

  return newWorkspace;
}

export async function deleteWorkspace(id) {
  const { data, error } = await supabase
    .from("workspaces")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting workspace:", error);
    throw new Error("Could not delete the workspace");
  }

  return data;
}

export async function getWorkspaceById(id) {
  if (!id) throw new Error("Workspace ID is required");

  const { data, error } = await supabase
    .from("workspaces")
    .select(
      `
      *,
      prompts (
        *,
        prompt_versions (
          *
        )
      )
    `,
    )
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching workspace details:", error);
    throw new Error("Workspace not found");
  }

  if (data.prompts && data.prompts.length > 0) {
    data.prompts.sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at),
    );
  }

  return data;
}
