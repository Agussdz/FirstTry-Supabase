// register.js
document
  .getElementById("register-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("register-email").value;
    const password = document.getElementById("register-password").value;

    const { createClient } = window.supabase;
    const SUPABASE_URL = "https://jobzlopxiabhdfvsitym.supabase.co";
    const SUPABASE_KEY =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpvYnpsb3B4aWFiaGRmdnNpdHltIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjIwMDQ0NTYsImV4cCI6MjAzNzU4MDQ1Nn0.3jUNdViiy9h98grOmRB16Olffe27d9Wzp-9R_QWp6VI";
    const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

    const { error } = await supabase.auth.signUp({ email, password });

    if (error) {
      alert("Registration failed: " + error.message);
    } else {
      window.location.href = "login.html";
    }
  });
