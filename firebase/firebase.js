const SUPABASE_URL = "https://ehskahiyhiqafaubxhxo.supabase.co";
const SUPABASE_KEY = "sb_publishable__Bt-TIM5-XTZZ7teVR1XBA_rR5rTg9M";

async function getClassroomData() {
  const response = await fetch(
    `${SUPABASE_URL}/rest/v1/classroom?select=*&limit=1`,
    {
      headers: {
        "apikey": SUPABASE_KEY,
        "Authorization": `Bearer ${SUPABASE_KEY}`
      }
    }
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
        headers: {
          "Content-Type": "application/json",
          "apikey": SUPABASE_KEY,
          "Authorization": `Bearer ${SUPABASE_KEY}`,
          "Prefer": "return=representation"
        },
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
        headers: {
          "Content-Type": "application/json",
          "apikey": SUPABASE_KEY,
          "Authorization": `Bearer ${SUPABASE_KEY}`,
          "Prefer": "return=representation"
        },
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

async function saveScore(classCode, score) {
  await fetch(
    `${SUPABASE_URL}/rest/v1/scores`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": SUPABASE_KEY,
        "Authorization": `Bearer ${SUPABASE_KEY}`,
        "Prefer": "return=representation"
      },
      body: JSON.stringify({ class_code: classCode, score: score })
    }
  );
}

async function getAverageScore() {
  const data = await getClassroomData();
  if (!data) return null;
  const response = await fetch(
    `${SUPABASE_URL}/rest/v1/scores?class_code=eq.${data.class_code}&select=score`,
    {
      headers: {
        "apikey": SUPABASE_KEY,
        "Authorization": `Bearer ${SUPABASE_KEY}`
      }
    }
  );
  const rows = await response.json();
  if (!rows || rows.length === 0) return null;
  const avg = rows.reduce((sum, r) => sum + r.score, 0) / rows.length;
  return Math.round(avg * 10) / 10;
}