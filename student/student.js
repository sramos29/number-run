// Load everything when page opens
window.onload = async function() {
  await loadClassCode();
  await loadAnnouncements();
  await loadAssignedExercise();
}

// Show class code
async function loadClassCode() {
  const code = await getClassCode();
  const display = document.getElementById("class-code-display");
  display.textContent = code || "No class yet";
}

// Show announcements
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

// Show assigned exercise
async function loadAssignedExercise() {
  const exercise = await getAssignedExercise();
  const display = document.getElementById("exercise-display");
  if (!exercise) {
    display.innerHTML = "<p class='empty-msg'>No exercise assigned yet.</p>";
    return;
  }
  display.innerHTML = `
    <div style="background:linear-gradient(135deg, #ff6b6b, #ffd93d); padding:16px; border-radius:14px;">
      <p style="font-size:18px; font-weight:800; color:white;">${exercise}</p>
      <p style="color:rgba(255,255,255,0.8); font-size:14px; margin-top:6px; font-weight:600;">Complete this exercise by saying your answer out loud!</p>
    </div>
  `;
}