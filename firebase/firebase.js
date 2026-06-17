const SUPABASE_URL = "https://ehskahiyhiqafaubxhxo.supabase.co";
const SUPABASE_KEY = "sb_publishable__Bt-TIM5-XTZZ7teVR1XBA_rR5rTg9M";

// Shared headers so we don't repeat ourselves
function headers(extra) {
  return Object.assign(
    {
      "apikey": SUPABASE_KEY,
      "Authorization": `Bearer ${SUPABASE_KEY}`
    },
    extra || {}
  );
}

async function getClassroomData() {
  const response = await fetch(
    `${SUPABASE_URL}/rest/v1/classroom?select=*&limit=1`,
    { headers: headers(), cache: "no-store" }
  );
  const data = await response.json();
  return data.length > 0 ? data[0] : null;
}

function generateClassCode() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < 5; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

async function saveClassroomData(classCode, announcements, assignedExercise) {
  const existing = await getClassroomData();
  if (existing) {
    await fetch(
      `${SUPABASE_URL}/rest/v1/classroom?class_code=eq.${existing.class_code}`,
      {
        method: "PATCH",
        cache: "no-store",
        headers: headers({
          "Content-Type": "application/json",
          "Prefer": "return=representation"
        }),
        body: JSON.stringify({
          announcements: announcements,
          assigned_exercise: assignedExercise
        })
      }
    );
  } else {
    await fetch(
      `${SUPABASE_URL}/rest/v1/classroom`,
      {
        method: "POST",
        cache: "no-store",
        headers: headers({
          "Content-Type": "application/json",
          "Prefer": "return=representation"
        }),
        body: JSON.stringify({
          class_code: classCode,
          announcements: announcements || "",
          assigned_exercise: assignedExercise || ""
        })
      }
    );
  }
}

async function getClassCode() {
  const data = await getClassroomData();
  return data ? data.class_code : null;
}

async function getAnnouncements() {
  const data = await getClassroomData();
  if (!data || !data.announcements) return [];
  try {
    return JSON.parse(data.announcements);
  } catch {
    return [];
  }
}

async function saveAnnouncement(text) {
  const data = await getClassroomData();
  const announcements = data && data.announcements ? JSON.parse(data.announcements) : [];
  announcements.push({ text: text, date: new Date().toLocaleDateString() });
  await saveClassroomData(
    data ? data.class_code : generateClassCode(),
    JSON.stringify(announcements),
    data ? data.assigned_exercise : ""
  );
}

// --- Exercise level (which kind of maths the students get) ---
const VALID_LEVELS = ["addition", "subtraction", "multiplication", "division", "mixed"];

async function getAssignedExercise() {
  const data = await getClassroomData();
  const level = data ? data.assigned_exercise : "";
  return VALID_LEVELS.includes(level) ? level : "mixed";
}

async function saveAssignedExercise(level) {
  const data = await getClassroomData();
  await saveClassroomData(
    data ? data.class_code : generateClassCode(),
    data ? data.announcements : "",
    level
  );
}

// --- Scores (with student names) ---
async function saveScore(classCode, studentName, score) {
  await fetch(
    `${SUPABASE_URL}/rest/v1/scores`,
    {
      method: "POST",
      cache: "no-store",
      headers: headers({
        "Content-Type": "application/json",
        "Prefer": "return=representation"
      }),
      body: JSON.stringify({
        class_code: classCode,
        student_name: studentName || "Anonymous",
        score: score
      })
    }
  );
}

// Every individual score for the current class, highest first
async function getScores() {
  const data = await getClassroomData();
  if (!data) return [];
  const response = await fetch(
    `${SUPABASE_URL}/rest/v1/scores?class_code=eq.${data.class_code}&select=student_name,score&order=score.desc`,
    { headers: headers(), cache: "no-store" }
  );
  const rows = await response.json();
  return Array.isArray(rows) ? rows : [];
}

async function getAverageScore() {
  const rows = await getScores();
  if (!rows || rows.length === 0) return null;
  const avg = rows.reduce((sum, r) => sum + r.score, 0) / rows.length;
  return Math.round(avg * 10) / 10;
}

// --- New session: fresh class code + clean slate ---
async function startNewSession() {
  const data = await getClassroomData();
  const newCode = generateClassCode();
  if (data) {
    await fetch(
      `${SUPABASE_URL}/rest/v1/classroom?class_code=eq.${data.class_code}`,
      {
        method: "PATCH",
        cache: "no-store",
        headers: headers({
          "Content-Type": "application/json",
          "Prefer": "return=representation"
        }),
        body: JSON.stringify({
          class_code: newCode,
          announcements: "",
          assigned_exercise: ""
        })
      }
    );
  } else {
    await saveClassroomData(newCode, "", "");
  }
  return newCode;
}
