# CS355 Project 2
This is a full-featured Quiz Web App built using HTML, CSS, and JavaScript, with a Node.js + Express backend that serves questions from a JSON file. The app supports a clean UI, interactive gameplay, and advanced features like dark mode, progress tracking, and review mode.





🚀 Features

✅ Start screen with question count selector

✅ Fetches randomized questions from the server

✅ Multiple choice questions

✅ Shuffled answer order

✅ Timer per question (10 seconds)

✅ Progress tracker (text + bar)

✅ Dark mode toggle (persistent)

✅ End-of-quiz score display

✅ Review mode (shows your answers vs. correct)

✅ Replay functionality

✅ Persistent user storage and maintenance (via backend/database)

✅ Customizable user profiles

✅ Editable bio, email, username, and password

✅ Account Handling and Security

✅ Game history tracking and display

✅ Seamless profile update experience

✅ Real-time leaderboard showcasing top-performing users




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

4. Start the server:\

   node server.js

5. Access the app:

   Visit http://localhost:3000 in your browser
   
6. To access the App online, please use this link

   Visit [quiz-app-rrfw.onrender.com]

🧑 Author
1. Mohd Afwan Shaikh [https://www.linkedin.com/in/mohdafwan/] [https://afwans.github.io/]
2. sara
3. Arjun Chhabra [https://www.linkedin.com/in/arjun-chhabra-22150b247/] [https://github.com/Jun1604] 
4. sadia


Contribution to the project 

| Name | GitHub Handle | Contribution |
| ----- | ----- | ----- |
| Mohd Afwan Shaikh | @- | dgrdegergeger |
| Arjun | @-| gregerergergre |
| Sara | @-| gregerergergre |
| Sadia Sharmin | @ssharmin28 | htrddtrhgrt |




📄 License
This project is strictly limited to use by Mohd Afwan Shaikh, ......., and ...... Unauthorized usage, distribution, or modification by others is strictly prohibited and may lead to legal action.
If found in use outside of the authorized team, it can result in a lawsuit.


