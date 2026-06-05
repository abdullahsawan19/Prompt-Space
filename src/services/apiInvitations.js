import { supabase } from "../config/supabase";

export const PAGE_SIZE = 3;

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
  const { error } = await supabase
    .from("workspace_invitations")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Could not delete invitation");
  }

  return id;
}

export async function sendInvitation({
  workspaceId,
  email,
  role,
  currentUserId,
}) {
  const { data, error } = await supabase
    .from("workspace_invitations")
    .insert([
      {
        workspace_id: workspaceId,
        email: email,
        role: role,
        invited_by: currentUserId,
        status: "pending",
      },
    ])
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Could not send the invitation");
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
