# 🔢 Number Run

Number Run is a math game for kids where students answer questions by speaking their answer out loud. Teachers create a class, share a code with their students, and post announcements. Students join with the code and do math exercises using their voice.

## 👥 Team
- Sofia Ramos — @sramos29
- Lucas Mont — @LucasM0nt

## 💻 Tech Stack
- HTML, CSS, Vanilla JavaScript
- Supabase — database so data syncs across devices in real time
- Web Speech API — listens to the student's voice and checks their answer
- Nunito (Google Fonts)
- GitHub Pages — deployment

## 🚀 How to Run Locally
1. Clone the repo: `git clone https://github.com/sramos29/number-run.git`
2. Open in VS Code
3. Install the Live Server extension
4. Right-click `index.html` → Open with Live Server
5. It'll open in your browser automatically

> Note: voice recognition requires HTTPS, so mic features only work fully on the deployed version.

## 🌐 Live Demo
[number-run on GitHub Pages](https://sramos29.github.io/number-run)

## 📖 How to Use

**As a teacher:**
1. Click "I'm a Teacher" on the home page
2. Your class code is generated automatically — share it with your students
3. Post announcements from your dashboard

**As a student:**
1. Click "I'm a Student" on the home page
2. Type in the class code your teacher gave you
3. Read any announcements, then hit Run Simulation
4. Answer the math questions out loud — the game listens and scores you

## ✅ Features
- Teacher and student roles with separate dashboards
- Auto-generated class codes saved to Supabase
- Students join by entering a code, which is validated against the database
- Teacher announcements show up on the student dashboard in real time
- Voice answer detection using the Web Speech API
- Hearts system — you get 3 lives per round
- Scores are saved to Supabase after each game, and the teacher can see the class average

## 🤖 AI Tools Used
- Claude and ChatGPT for planning, debugging, and code help throughout the project

## 👩‍💻 Contributions
- **Sofia** — home page, teacher dashboard, student dashboard, join class flow, Supabase integration, overall styling and redesign
- **Lucas** — math question logic, voice recognition simulation, score system