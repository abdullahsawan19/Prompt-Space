import { supabase } from "../config/supabase";

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
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();
  if (error) throw new Error(error.message);

  const { data: userData, error: userError } = await supabase
    .from("users")
    .select("is_super_admin")
    .eq("id", data.user.id)
    .maybeSingle();

  if (userError) {
    console.error("Error fetching user profile:", userError);
  }

  return {
    ...data.user,
    is_super_admin: userData?.is_super_admin || false,
  };
}

export async function loginWithProvider(provider) {
  // provider = 'google' | 'github'
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

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
}
