import { createClient } from "@supabase/supabase-js";

const supabase = createClient("OUR_SUPABASE_URL", "OUR_ANON_KEY");

async function signUp(email, password, role) {
  const { user, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    console.error("Signup failed:", error.message);
  } else {
    console.log("User signed up:", user);
    
    // Assign role in DB
    await supabase.from("users").insert([{ email, role }]);
  }
}
