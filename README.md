# 🔢 Number Run

A math game for young learners where students solve math problems by writing their answer on paper and holding it up to the webcam. Teachers manage classes, assign exercises, and post announcements.

## 👥 Team
- Sofia Ramos — GitHub: @sramos29
- Lucas Mont — GitHub: @LucasM0nt

## 💻 Tech Stack
- HTML, CSS, JavaScript (Vanilla)
- localStorage (data persistence)
- Teachable Machine (handwritten number recognition)
- Netlify (deployment)

## 🚀 How to Run Locally
1. Clone this repo: `git clone https://github.com/sramos29/number-run.git`
2. Open the folder in VS Code
3. Install the Live Server extension
4. Right click `index.html` and select Open with Live Server
5. The app will open in your browser

## 🌐 Live Demo
Coming soon — will be deployed on Netlify

## 📖 How to Use

**As a teacher:**
1. Click "I'm a Teacher" on the home page
2. Your class code is automatically generated — share it with students
3. Post announcements to motivate your class
4. Assign exercises by clicking Assign next to a level

**As a student:**
1. Click "I'm a Student" on the home page
2. Your class code and teacher announcements will appear
3. Look at today's assigned exercise
4. Write your answer on paper and hold it up to the webcam

## 🤖 AI Tools Used
- Teachable Machine: trained custom model for handwritten digit recognition via webcam
- Claude and ChatGPT: used for architecture planning, debugging, code generation and problem solving throughout development

## 👩‍💻 Contributions
- Sofia Ramos: home page, login page, teacher dashboard, student dashboard, localStorage data persistence, styling
- Lucas Mont: math question logic, Teachable Machine model training, webcam answer detection, deployment

## ✅ Features
- Role selector for students and teachers
- Auto-generated class codes
- Teacher can post announcements
- Teacher can assign exercise levels
- Student dashboard reads all teacher data
- Webcam answer detection powered by Teachable Machine