async function joinClass() {
  const input = document.getElementById("code-input").value.trim().toUpperCase();
  const error = document.getElementById("join-error");

  if (!input || input.length !== 5) {
    error.textContent = "Please enter a 5 character class code!";
    return;
  }

  const data = await getClassroomData();

  if (!data || data.class_code !== input) {
    error.textContent = "Invalid class code. Try again!";
    return;
  }

  document.getElementById("join-screen").style.display = "none";
  document.getElementById("dashboard-screen").style.display = "block";
  document.getElementById("class-code-display").textContent = input;
  localStorage.setItem("joinedClassCode", input);

  await loadAnnouncements();
}

const codeInput = document.getElementById("code-input");
if (codeInput) {
  codeInput.addEventListener("keypress", function(e) {
    if (e.key === "Enter") joinClass();
  });
}

async function loadAnnouncements() {
  const announcements = await getAnnouncements();
  const display = document.getElementById("announcements-display");
  if (announcements.length === 0) {
    display.innerHTML = "<p class='empty-msg'>No announcements yet.</p>";
    return;
  }
  display.innerHTML = announcements.map(function(a) {
    return `
      <div style="background:#f8f8f8; padding:12px; border-radius:10px; margin-top:10px;">
        <p style="color:#333; font-weight:700;">${a.text}</p>
        <p style="color:#aaa; font-size:12px; margin-top:6px; font-weight:600;">${a.date}</p>
      </div>
    `;
  }).join("");
}