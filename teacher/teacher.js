// Load everything when page opens
window.onload = async function() {
  await loadClassCode();
  await loadAnnouncements();
  await loadAssignedExercise();
}

// Load or generate class code
async function loadClassCode() {
  let code = await getClassCode();
  if (!code) {
    code = generateClassCode();
    await saveClassroomData(code, "", "");
  }
  document.getElementById("class-code").textContent = code;
}

// Post announcement
document.getElementById("post-btn").addEventListener("click", async function() {
  const input = document.getElementById("announcement-input");
  const text = input.value.trim();
  if (!text) {
    alert("Please write something first!");
    return;
  }
  await saveAnnouncement(text);
  input.value = "";
  await loadAnnouncements();
});

// Load and display announcements
async function loadAnnouncements() {
  const announcements = await getAnnouncements();
  const list = document.getElementById("announcements-list");
  if (announcements.length === 0) {
    list.innerHTML = "<p style='opacity:0.4; font-weight:600;'>No announcements posted yet.</p>";
    return;
  }
  list.innerHTML = announcements.map(function(a) {
    return `
      <div style="background:#f8f8f8; padding:12px; border-radius:10px; margin-top:10px;">
        <p style="color:#333; font-weight:700;">${a.text}</p>
        <p style="color:#aaa; font-size:12px; margin-top:6px; font-weight:600;">${a.date}</p>
      </div>
    `;
  }).join("");
}

// Load assigned exercise
async function loadAssignedExercise() {
  const assigned = await getAssignedExercise();
  const buttons = document.querySelectorAll(".assign-btn");
  buttons.forEach(function(button) {
    const exercise = button.parentElement.querySelector("span").textContent;
    if (assigned === exercise) {
      button.textContent = "✓ Assigned";
      button.style.background = "#2ecc71";
      button.style.borderColor = "#2ecc71";
      button.style.boxShadow = "0 3px 0px #27ae60";
    }
  });
}

// Assign buttons
const assignButtons = document.querySelectorAll(".assign-btn");
assignButtons.forEach(function(button) {
  button.addEventListener("click", async function() {
    const exercise = button.parentElement.querySelector("span").textContent;
    if (button.textContent === "Assign") {
      assignButtons.forEach(function(b) {
        b.textContent = "Assign";
        b.style.background = "#ffd93d";
        b.style.boxShadow = "0 3px 0px #e6c200";
      });
      button.textContent = "✓ Assigned";
      button.style.background = "#2ecc71";
      button.style.boxShadow = "0 3px 0px #27ae60";
      await saveAssignedExercise(exercise);
    } else {
      button.textContent = "Assign";
      button.style.background = "#ffd93d";
      button.style.boxShadow = "0 3px 0px #e6c200";
      await saveAssignedExercise("");
    }
  });
});