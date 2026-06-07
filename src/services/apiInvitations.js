import { supabase } from "../config/supabase";

export const PAGE_SIZE = 5;

export async function getSentInvitations({ workspaceId, filterStatus, page }) {
  let query = supabase
    .from("workspace_invitations")
    .select("*", { count: "exact" })
    .eq("workspace_id", workspaceId);

  if (filterStatus && filterStatus !== "all") {
    query = query.eq("status", filterStatus);
  }

  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    query = query.range(from, to);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error(error);
    throw new Error("Invitations could not be loaded");
  }

  return { data, count };
}

export async function deleteInvitation(id) {
  const { data, error } = await supabase
    .from("workspace_invitations")
    .delete()
    .eq("id", id)
    .select();

  if (error) {
    console.error(error);
    throw new Error("Could not delete invitation");
  }

  if (!data || data.length === 0) {
    throw new Error("You do not have permission to delete this invitation.");
  }

  return id;
}

export async function sendInvitation({ workspaceId, email, role }) {
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new Error("You must be logged in to send invitations.");
  }

  const { data: targetUser, error: userError } = await supabase
    .from("users")
    .select("accepts_invitations")
    .eq("email", email)
    .single();

  if (targetUser && targetUser.accepts_invitations === false) {
    throw new Error("This user does not accept workspace invitations.");
  }

  const { data, error } = await supabase
    .from("workspace_invitations")
    .insert([
      {
        workspace_id: workspaceId,
        email,
        role,
        invited_by: user.id,
      },
    ])
    .select()
    .single();

  if (error) {
    if (error.code === "23505") {
      throw new Error("An invitation has already been sent to this email.");
    }
    throw new Error("Could not send invitation");
  }

  return data;
}

export async function getMyPendingInvitations(email) {
  const { data, error } = await supabase
    .from("workspace_invitations")
    .select(
      `
      id,
      workspace_id,
      role,
      status,
      created_at,
      workspaces ( name ),
      users!workspace_invitations_invited_by_fkey ( full_name, email )
    `,
    )
    .eq("email", email)
    .eq("status", "pending");

  if (error) {
    console.error(error);
    throw new Error("Could not fetch your invitations");
  }

  return data;
}

export async function updateInvitationStatus({
  inviteId,
  status,
  workspaceId,
  role,
  userId,
}) {
  const { data, error } = await supabase
    .from("workspace_invitations")
    .update({ status })
    .eq("id", inviteId)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error(`Could not ${status} the invitation`);
  }

  if (status === "accepted") {
    const { error: memberError } = await supabase
      .from("workspace_members")
      .insert([
        {
          workspace_id: workspaceId,
          user_id: userId,
          role: role,
        },
      ]);

    if (memberError) {
      console.error(memberError);
      throw new Error("Could not add you to the workspace members");
    }
  }

  return data;
}

export async function getUserProfile(userId) {
  if (!userId) return null;
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) throw new Error("Could not fetch user profile");
  return data;
}

export async function updateInvitationPreference({
  userId,
  acceptsInvitations,
}) {
  const { data, error } = await supabase
    .from("users")
    .update({ accepts_invitations: acceptsInvitations })
    .eq("id", userId)
    .select()
    .single();

  if (error) throw new Error("Could not update preferences");
  return data;
}
