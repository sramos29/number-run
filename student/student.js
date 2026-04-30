// Placeholder - webcam and math logic will be connected here by Lucas
// Firebase will populate class info and announcements

// Load everything when the page opens
window.onload = function() {
  loadClassCode();
  loadAnnouncements();
  loadAssignedExercise();
}

// Show the class code the teacher generated
function loadClassCode() {
  const code = getClassCode();
  const display = document.getElementById("class-code-display");
  if (code) {
    display.textContent = code;
  } else {
    display.textContent = "No class yet";
  }
}

// Show announcements from the teacher
function loadAnnouncements() {
  const announcements = getAnnouncements();
  const display = document.getElementById("announcements-display");

  if (announcements.length === 0) {
    display.innerHTML = "<p class='empty-msg'>No announcements yet.</p>";
    return;
  }

  display.innerHTML = announcements.map(function(a) {
    return `
      <div style="background:rgba(255,255,255,0.05); padding:12px; border-radius:8px; margin-top:10px;">
        <p>${a.text}</p>
        <p style="opacity:0.4; font-size:12px; margin-top:6px;">${a.date}</p>
      </div>
    `;
  }).join("");
}

// Show which exercise the teacher assigned
function loadAssignedExercise() {
  const exercise = getAssignedExercise();
  const display = document.getElementById("exercise-display");

  if (!exercise) {
    display.innerHTML = "<p class='empty-msg'>No exercise assigned yet.</p>";
    return;
  }

  display.innerHTML = `
    <div style="background:rgba(233,69,96,0.15); border:1px solid rgba(233,69,96,0.3); padding:16px; border-radius:10px;">
      <p style="font-size:18px; font-weight:bold;">${exercise}</p>
      <p style="opacity:0.6; font-size:14px; margin-top:6px;">Complete this exercise by showing your answer to the camera!</p>
    </div>
  `;
}