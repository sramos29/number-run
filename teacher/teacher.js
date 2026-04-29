// Make each assign button interactive when clicked
const assignButtons = document.querySelectorAll(".assign-btn");

assignButtons.forEach(function(button) {
  button.addEventListener("click", function() {
    if (button.textContent === "Assign") {
      button.textContent = "✓ Assigned";
      button.style.background = "#2ecc71";
      button.style.borderColor = "#2ecc71";
    } else {
      button.textContent = "Assign";
      button.style.background = "#0f3460";
      button.style.borderColor = "rgba(255,255,255,0.3)";
    }
  });
});