# CS355 Project 2
This is a full-featured Quiz Web App built using HTML, CSS, and JavaScript, with a Node.js + Express backend that serves questions from a JSON file. The app supports a clean UI, interactive gameplay, and advanced features like dark mode, progress tracking, review mode, and more.



🚀 Features

✅ Start screen with question count selector

✅ Fetches randomized questions from the server

✅ Multiple choice questions

✅ Shuffled answer order

✅ Timer per question (10 seconds)

✅ Progress tracker (text + bar)

✅ Dark mode toggle 

✅ End-of-quiz score display

✅ Review mode (shows your answers vs. correct)

✅ Replay functionality

✅ user storage and maintenance (via backend/database)

✅ Customizable user profiles

✅ Editable bio, email, username, and password

✅ Account Handling and Security

✅ Game history tracking and display

✅ Seamless profile update experience

✅ Real-time leaderboard showcasing top-performing users

✅ Sound mode toggle

✅ Sound effects when a question is answered

✅ Final message based on scores




🧠 Technologies Used
Frontend: HTML, CSS, JavaScript

Backend: Node.js with Express

Data: Static JSON file containing question objects


 Project Structure
quiz-app/

├── bin

│ └── www

├── databases/

│ ├── questions.json

│ ├── avatar.json

│ ├── games.json

│ ├── leaderboard.json

│ ├──users.json

│ └── profiles.json

├── public/

│ ├── /Images

│  │ ├── img1.jpeg

│  │ ├── img2.jpeg

│  │ ├── img3.jpeg

│  │ └── img4.jpeg

│ ├── /JavaScript

│  │ ├── script.js

│  │ ├── navbar.js 

│  │ ├── profileSettings.js  

│  │ └── darkmode.js  

│ ├── /sound

│  │ ├── happy.mp3

│  │ ├── ohno.mp3 

│  │ ├── timeout.mp3  

│ ├── /Stylesheets

│  │ ├── darkmode.css

│  │ ├──  header.css

│  │ ├── homepage.css

│  │ ├── settings.css

│  │ └── style.css

├── routes/

│ ├── auth.js

│ ├── index.js

│ ├── leaderboard.js

│ ├── profile.js

│ ├── quiz.js

│ └── settings.js

├── views/

│ ├── /auth

│  │ ├── header.ejs

│  │ ├── index.ejs

│  │ ├── signin.ejs

│  │ └── signup.ejs

│ ├── /main

│  │ ├── leaderboard.ejs

│  │ ├── mainPage.ejs

│  │ ├── profile.ejs

│  │ ├──quiz.ejs

│  │ ├── quizheader.ejs

│  │ └──settings.ejs

│ └──error.ejs

├── app.js

├──package.json

└── README.md


📦 Setup Instructions


1. Clone the repo:

   git clone https://github.com/Afwans/quiz-app.git

   cd quiz-app

3. Install dependencies:

   npm install

4. Start the server:

   npm start / node app.js

6. Access the app:

   Visit http://localhost:3000 in your browser
   
7. To access the App online, please use this link

   Visit [quiz-app-rrfw.onrender.com]

🧑 Authors
1. Mohd Afwan Shaikh [https://www.linkedin.com/in/mohdafwan/] [https://afwans.github.io/]
2. Nageen Saira [https://www.linkedin.com/in/nageensaira/] [https://nageen123-saira.github.io/port/]
3. Arjun Chhabra [https://www.linkedin.com/in/arjun-chhabra-22150b247/] [https://github.com/Jun1604] 
4. Sadia Sharmin [https://www.linkedin.com/in/sadiasharmin16/] [https://ssharmin28.github.io/]


Contribution to the project 

| Name  | Contribution |
| ----- | ----- |
| Mohd Afwan Shaikh  | dgrdegergeger |
| Arjun Chhabra | gregerergergre |
| Nageen Saira | gregerergergre |
| Sadia Sharmin | htrddtrhgrt |




📄 License
This project is strictly limited to use by Mohd Afwan Shaikh, Arjun Chhabra, Sadia Sharmin, and Nageen Saira. Unauthorized usage, distribution, or modification by others is strictly prohibited and may lead to legal action.
If found in use outside of the authorized team, it can result in a lawsuit.


