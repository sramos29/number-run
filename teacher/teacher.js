// Connect to our local storage functions
// Load the class code when the page opens
window.onload = function() {
  loadClassCode();
  loadAnnouncements();
  loadAssignedExercise();
}

// Class code — generate one if it doesn't exist yet
function loadClassCode() {
  let code = getClassCode();
  if (!code) {
    code = generateClassCode();
    saveClassCode(code);
  }
  document.getElementById("class-code").textContent = code;
}

// Post announcement when button is clicked
document.getElementById("post-btn").addEventListener("click", function() {
  const input = document.getElementById("announcement-input");
  const text = input.value.trim();

  if (!text) {
    alert("Please write something first!");
    return;
  }

  saveAnnouncement(text);
  input.value = "";
  loadAnnouncements();
});

// Load and display all announcements
function loadAnnouncements() {
  const announcements = getAnnouncements();
  const list = document.getElementById("announcements-list");

  if (announcements.length === 0) {
    list.innerHTML = "<p style='opacity:0.4'>No announcements posted yet.</p>";
    return;
  }

  list.innerHTML = announcements.map(function(a) {
    return `
      <div style="background:rgba(255,255,255,0.05); padding:12px; border-radius:8px; margin-top:10px;">
        <p>${a.text}</p>
        <p style="opacity:0.4; font-size:12px; margin-top:6px;">${a.date}</p>
      </div>
    `;
  }).join("");
}

// Assign exercise when button clicked
function loadAssignedExercise() {
  const assigned = getAssignedExercise();
  const buttons = document.querySelectorAll(".assign-btn");
  
  buttons.forEach(function(button) {
    const exercise = button.parentElement.querySelector("span").textContent;
    if (assigned === exercise) {
      button.textContent = "✓ Assigned";
      button.style.background = "#2ecc71";
      button.style.borderColor = "#2ecc71";
    }
  });
}

// Make assign buttons interactive
const assignButtons = document.querySelectorAll(".assign-btn");

assignButtons.forEach(function(button) {
  button.addEventListener("click", function() {
    const exercise = button.parentElement.querySelector("span").textContent;

    if (button.textContent === "Assign") {
      // Unassign all others first
      assignButtons.forEach(function(b) {
        b.textContent = "Assign";
        b.style.background = "#0f3460";
        b.style.borderColor = "rgba(255,255,255,0.3)";
      });

      // Assign this one
      button.textContent = "✓ Assigned";
      button.style.background = "#2ecc71";
      button.style.borderColor = "#2ecc71";
      saveAssignedExercise(exercise);
    } else {
      button.textContent = "Assign";
      button.style.background = "#0f3460";
      button.style.borderColor = "rgba(255,255,255,0.3)";
      saveAssignedExercise(null);
    }
  });
});