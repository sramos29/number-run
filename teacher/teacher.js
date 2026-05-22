// Load everything when page opens
window.onload = async function() {
  await loadClassCode();
  await loadAnnouncements();
  await loadAverageScore();
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

// Load average score
async function loadAverageScore() {
  const avg = await getAverageScore();
  const display = document.getElementById("average-score");
  if (!display) return;
  if (avg === null) {
    display.textContent = "No scores yet";
  } else {
    display.textContent = `Class average: ${avg} / 10 ⭐`;
  }
}