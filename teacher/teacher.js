// Load everything when page opens
window.onload = async function() {
  await loadClassCode();
  await loadLevel();
  await loadAnnouncements();
  await loadScores();
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

// --- Math level picker ---
async function loadLevel() {
  const current = await getAssignedExercise();
  highlightLevel(current);
}

function highlightLevel(level) {
  document.querySelectorAll(".level-btn").forEach(function(btn) {
    btn.classList.toggle("active", btn.dataset.level === level);
  });
}

document.querySelectorAll(".level-btn").forEach(function(btn) {
  btn.addEventListener("click", async function() {
    const level = btn.dataset.level;
    highlightLevel(level);
    await saveAssignedExercise(level);
  });
});

// --- New session ---
document.getElementById("new-session-btn").addEventListener("click", async function() {
  const ok = confirm("Start a new session? This creates a new class code and clears the current scores and announcements.");
  if (!ok) return;
  const newCode = await startNewSession();
  document.getElementById("class-code").textContent = newCode;
  highlightLevel("mixed");
  await loadAnnouncements();
  await loadScores();
});

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

// Load average + individual named scores
async function loadScores() {
  const rows = await getScores();
  const avgDisplay = document.getElementById("average-score");
  const list = document.getElementById("scores-list");

  if (!rows || rows.length === 0) {
    avgDisplay.textContent = "No scores yet";
    list.innerHTML = "<p style='opacity:0.4; font-weight:600;'>Students will appear here once they play.</p>";
    return;
  }

  const avg = Math.round((rows.reduce(function(s, r) { return s + r.score; }, 0) / rows.length) * 10) / 10;
  avgDisplay.textContent = `Class average: ${avg} / 10 ⭐`;

  list.innerHTML = rows.map(function(r, i) {
    const medal = i === 0 ? "🥇 " : i === 1 ? "🥈 " : i === 2 ? "🥉 " : "";
    const name = r.student_name || "Anonymous";
    return `
      <div style="display:flex; justify-content:space-between; align-items:center; background:#f8f8f8; padding:12px 16px; border-radius:10px; margin-top:8px;">
        <span style="color:#333; font-weight:700;">${medal}${name}</span>
        <span style="color:#667eea; font-weight:800;">${r.score} / 10</span>
      </div>
    `;
  }).join("");
}
