async function signIn(email, password) {
    const { user, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
  
    if (error) console.error("Login failed:", error.message);
    else console.log("Logged in:", user);
  }
  