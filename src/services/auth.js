import { supabase } from "../config/supabase";
let isSyncing = false;

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw new Error(error.message);

  return data;
}

export async function signup({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function getCurrentUser() {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error || !user) return null;

  const { data: userData, error: userError } = await supabase
    .from("users")
    .select("id, is_super_admin")
    .eq("id", user.id)
    .maybeSingle();

  if (userError) {
    console.error("Error fetching user profile:", userError);
  }

  return {
    ...user,
    is_super_admin: userData?.is_super_admin || false,
    isProfileCreated: !!userData?.id,
  };
}

export async function loginWithProvider(provider) {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${window.location.origin}/dashboard`,
      queryParams: {
        prompt: "consent",
      },
    },
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function ensureUserAndWorkspace(user) {
  if (!user || isSyncing) return;
  isSyncing = true;

  try {
    if (!user.isProfileCreated) {
      await supabase.from("users").insert([
        {
          id: user.id,
          email: user.email,
          full_name: user.user_metadata?.full_name || "User",
        },
      ]);
    }

    const { data: workspaceData } = await supabase
      .from("workspaces")
      .select("id")
      .eq("owner_id", user.id)
      .eq("type", "personal")
      .limit(1);

    if (!workspaceData || workspaceData.length === 0) {
      const { data: newWorkspace, error: wsError } = await supabase
        .from("workspaces")
        .insert([
          { name: "My Personal Space", type: "personal", owner_id: user.id },
        ])
        .select()
        .single();

      if (wsError) throw new Error(wsError.message);

      if (newWorkspace) {
        await supabase
          .from("workspace_members")
          .insert([
            { workspace_id: newWorkspace.id, user_id: user.id, role: "owner" },
          ]);
      }
    }
  } catch (error) {
    console.error("Error syncing user data:", error.message);
  } finally {
    isSyncing = false;
  }
}

export async function updateUserProfile({ userId, fullName }) {
  const { data, error } = await supabase
    .from("users")
    .update({ full_name: fullName })
    .eq("id", userId)
    .select()
    .single();

  if (error) throw new Error("Could not update profile information");
  return data;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
}
