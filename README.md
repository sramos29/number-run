# 🔢 Number Run

A math game for young learners where students solve math problems by saying their answer out loud. Teachers manage classes, assign exercises, and post announcements. Students join their class using a unique code and complete exercises through voice recognition.

## 👥 Team
- Sofia Ramos — GitHub: @sramos29
- Lucas Mont — GitHub: @LucasM0nt

## 💻 Tech Stack
- HTML, CSS, JavaScript (Vanilla)
- Supabase (online database for real-time data sharing)
- Web Speech API (voice recognition)
- Nunito font (Google Fonts)
- Netlify (deployment)

## 🚀 How to Run Locally
1. Clone this repo: `git clone https://github.com/sramos29/number-run.git`
2. Open the folder in VS Code
3. Install the Live Server extension
4. Right click `index.html` and select Open with Live Server
5. The app will open in your browser
6. Note: microphone features require HTTPS — use the deployed Netlify link for full testing

## 🌐 Live Demo
Coming soon — will be deployed on Netlify

## 📖 How to Use

**As a teacher:**
1. Click "I'm a Teacher" on the home page
2. Your class code is automatically generated — share it with your students
3. Post announcements to motivate your class
4. Assign exercises by clicking Assign next to a level

**As a student:**
1. Click "I'm a Student" on the home page
2. Enter the class code your teacher gave you
3. See your teacher's announcements and today's assigned exercise
4. Click Run Simulation to say your answer out loud

## 🤖 AI Tools Used
- Web Speech API: built in browser voice recognition for student answer detection
- Claude and ChatGPT: used for architecture planning, debugging, code generation and problem solving throughout development

## 👩‍💻 Contributions
- Sofia Ramos: home page, teacher dashboard, student dashboard, join class screen, Supabase database integration, kid friendly redesign, styling
- Lucas Mont: math question logic, voice recognition simulation, deployment

## ✅ Features
- Role selector for students and teachers
- Auto generated class codes stored in Supabase
- Students join class by entering a code — validated against the database
- Teacher can post announcements visible to all students
- Teacher can assign exercise levels
- Student dashboard reads all teacher data in real time
- Works across different computers and devices
- Voice answer detection via Web Speech API