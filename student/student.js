async function joinClass() {
  const name = document.getElementById("name-input").value.trim();
  const input = document.getElementById("code-input").value.trim().toUpperCase();
  const error = document.getElementById("join-error");

  if (!name) {
    error.textContent = "Please type your name!";
    return;
  }

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
  document.getElementById("student-name-display").textContent = name;
  localStorage.setItem("joinedClassCode", input);
  localStorage.setItem("studentName", name);

  await loadAnnouncements();
}

const codeInput = document.getElementById("code-input");
if (codeInput) {
  codeInput.addEventListener("keypress", function(e) {
    if (e.key === "Enter") joinClass();
  });
}

const nameInput = document.getElementById("name-input");
if (nameInput) {
  nameInput.addEventListener("keypress", function(e) {
    if (e.key === "Enter") document.getElementById("code-input").focus();
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
