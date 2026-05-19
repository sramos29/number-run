// Supabase configuration
const SUPABASE_URL = "https://ehskahiyhiqafaubxhxo.supabase.co";
const SUPABASE_KEY = "sb_publishable__Bt-TIM5-XTZZ7teVR1XBA_rR5rTg9M";

// Helper function to make API calls to Supabase
async function supabaseRequest(method, body = null, filters = "") {
  const url = `${SUPABASE_URL}/rest/v1/classroom${filters}`;
  const options = {
    method: method,
    headers: {
      "Content-Type": "application/json",
      "apikey": SUPABASE_KEY,
      "Authorization": `Bearer ${SUPABASE_KEY}`,
      "Prefer": method === "POST" ? "return=representation" : "return=representation"
    }
  };
  if (body) options.body = JSON.stringify(body);
  const response = await fetch(url);
  return response.json();
}

// Generate a random 5 character class code
function generateClassCode() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < 5; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

// Get classroom data from Supabase
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

// Save or update classroom data
async function saveClassroomData(classCode, announcements, assignedExercise) {
  const existing = await getClassroomData();

  if (existing) {
    // Update existing row
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
    // Insert new row
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

// Get class code
async function getClassCode() {
  const data = await getClassroomData();
  return data ? data.class_code : null;
}

// Get announcements
async function getAnnouncements() {
  const data = await getClassroomData();
  if (!data || !data.announcements) return [];
  try {
    return JSON.parse(data.announcements);
  } catch {
    return [];
  }
}

// Save announcement
async function saveAnnouncement(text) {
  const data = await getClassroomData();
  const announcements = data && data.announcements ? JSON.parse(data.announcements) : [];
  announcements.push({
    text: text,
    date: new Date().toLocaleDateString()
  });
  await saveClassroomData(
    data ? data.class_code : generateClassCode(),
    JSON.stringify(announcements),
    data ? data.assigned_exercise : ""
  );
}

// Get assigned exercise
async function getAssignedExercise() {
  const data = await getClassroomData();
  return data ? data.assigned_exercise : null;
}

// Save assigned exercise
async function saveAssignedExercise(exercise) {
  const data = await getClassroomData();
  await saveClassroomData(
    data ? data.class_code : generateClassCode(),
    data ? data.announcements : "",
    exercise
  );
}