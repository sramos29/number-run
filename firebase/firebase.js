// Data storage using localStorage
// This stores all app data in the browser

// Generate a random 5 character class code
function generateClassCode() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < 5; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

// Save teacher data
function saveTeacherData(data) {
  localStorage.setItem("teacherData", JSON.stringify(data));
}

// Get teacher data
function getTeacherData() {
  const data = localStorage.getItem("teacherData");
  return data ? JSON.parse(data) : null;
}

// Save announcement
function saveAnnouncement(text) {
  const announcements = getAnnouncements();
  announcements.push({
    text: text,
    date: new Date().toLocaleDateString()
  });
  localStorage.setItem("announcements", JSON.stringify(announcements));
}

// Get all announcements
function getAnnouncements() {
  const data = localStorage.getItem("announcements");
  return data ? JSON.parse(data) : [];
}

// Save assigned exercise
function saveAssignedExercise(exercise) {
  localStorage.setItem("assignedExercise", exercise);
}

// Get assigned exercise
function getAssignedExercise() {
  return localStorage.getItem("assignedExercise") || null;
}

// Save class code
function saveClassCode(code) {
  localStorage.setItem("classCode", code);
}

// Get class code
function getClassCode() {
  return localStorage.getItem("classCode") || null;
}