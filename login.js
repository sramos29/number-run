function showLogin() {
  document.getElementById("login-form").style.display = "flex";
  document.getElementById("signup-form").style.display = "none";
  document.getElementById("login-toggle").classList.add("active");
  document.getElementById("signup-toggle").classList.remove("active");
}

function showSignup() {
  document.getElementById("login-form").style.display = "none";
  document.getElementById("signup-form").style.display = "flex";
  document.getElementById("signup-toggle").classList.add("active");
  document.getElementById("login-toggle").classList.remove("active");
}

function handleLogin() {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  if (!email || !password) {
    document.getElementById("error-message").textContent = "Please fill in all fields.";
    return;
  }

  // Firebase login will go here later
  document.getElementById("error-message").textContent = "Firebase not connected yet.";
}

function handleSignup() {
  const name = document.getElementById("signup-name").value;
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;

  if (!name || !email || !password) {
    document.getElementById("error-message").textContent = "Please fill in all fields.";
    return;
  }

  // Firebase signup will go here later
  document.getElementById("error-message").textContent = "Firebase not connected yet.";
}
