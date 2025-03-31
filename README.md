# CodeQuiz - Interactive Programming Quiz Web Application

![CodeQuiz Banner](https://github.com/Kishore735/Quiz/blob/main/website/image/demo.png?raw=true)

## 📝 Overview

CodeQuiz is an interactive web application designed to help users test and improve their programming knowledge through quizzes. The application offers multiple language options (Python, Java, C, C++) with module-based quizzes and provides real-time feedback and performance analytics. It also includes an AI-powered chatbot assistant to help users with programming questions and concepts.

### ✨ Features

- **Multi-language Support**: Quiz content for Python, Java, C, and C++
- **Module-based Learning**: Structured quizzes organized by programming topics
- **Real-time Feedback**: Instant feedback on quiz answers
- **Performance Analytics**: Detailed performance metrics with visual charts
- **Firebase Integration**: Cloud-based data storage and authentication
- **Responsive Design**: Mobile and desktop-friendly user interface
- **AI Chatbot Assistant**: Powered by DeepSeek R1 model to answer programming questions

## 🛠️ Technology Stack

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Firebase (Authentication, Firestore)
- **Charts**: Chart.js
- **Hosting**: Firebase Hosting
- **AI Model**: DeepSeek R1

## 🚀 Installation & Setup

### Prerequisites

- Node.js and npm
- Firebase account
- Firebase CLI (`npm install -g firebase-tools`)

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/codequiz.git
   cd codequiz
   ```

2. **Configure Firebase**
   - Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Authentication and Firestore
   - Add a web app to your Firebase project
   - Copy your Firebase config

3. **Set up Firebase configuration**
   - Create `js/firebase-config.js` with your Firebase configuration:
   ```javascript
   const firebaseConfig = {
     apiKey: "YOUR_API_KEY",
     authDomain: "YOUR_AUTH_DOMAIN",
     projectId: "YOUR_PROJECT_ID",
     storageBucket: "YOUR_STORAGE_BUCKET",
     messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
     appId: "YOUR_APP_ID"
   };

   // Initialize Firebase
   firebase.initializeApp(firebaseConfig);
   ```
4. **Configure DeepSeek R1 API**

   - Obtain an API key for DeepSeek R1
   - Add your API key to js/bot.js:
   ```javascript

   const DEEPSEEK_API_KEY = "YOUR_DEEPSEEK_API_KEY";
   ```

5. **Deploy to Firebase**
   ```bash
   firebase login
   firebase init
   firebase deploy
   ```

## 📁 Project Structure

```
quiz-app/
├── index.html
├── css/
│   ├── styles.css
│   ├── result.css
│   └── bot.css
├── js/
│   ├── firebase-config.js
│   ├── auth.js
│   ├── quiz.js
│   └── bot.js
└── pages/
    ├── login.html
    ├── quiz-selection.html
    ├── quiz.html
    └── signup.html
```

## 📊 Firestore Data Structure

```
collections/
└── programming_languages/
    ├── python/
    │   └── modules/
    │       ├── basics/
    │       │   └── questions[]
    │       ├── data_structures/
    │       │   └── questions[]
    │       └── ...
    ├── java/
    ├── c/
    └── cpp/
```

Each question object has the following structure:
```javascript
{
"question_text": "Which operator is used to access the address of a variable?",
"options": ["*", "&", "->", "%"],
"correct_option": "&",
"explanation": "The '&' operator is used to get the memory address of a variable. For example, &x returns the memory address where the variable x is stored."
}
```

## 👨‍💻 Usage

1. **User Authentication**
   - Sign up or log in to access quizzes

2. **Quiz Selection**
   - Choose a programming language
   - Select a specific module/topic

3. **Take Quiz**
   - Answer multiple-choice questions
   - Receive immediate feedback on each answer

4. **View Results**
   - See performance summary after completing quiz
   - Analyze time spent on each question
   - Review percentage of correct answers

5. **AI Chatbot Assistant**

   - Access the chatbot from any page using the chat icon
   - Ask programming-related questions
   - Get code examples and explanations
   - Receive guidance on difficult quiz concepts

**🤖 DeepSeek R1 Chatbot Integration**
   The application includes an AI-powered chatbot that can assist users with programming questions and concepts. The chatbot is powered by the DeepSeek R1 model and provides:

   - Programming Help: Assistance with coding problems and concepts
   - Code Examples: Sample code snippets for various programming scenarios
   - Quiz Support: Explanations for quiz questions and answers
   - Learning Resources: Recommendations for further learning

The bot can be accessed throughout the application via a chat icon in the bottom corner of the screen.

## 🖼️ Screenshots

<div style="display: flex; justify-content: space-between;">
  <img src="https://github.com/Kishore735/Quiz/blob/main/website/image/login.png?raw=true" width="30%" alt="Login Screen">
  <img src="https://github.com/Kishore735/Quiz/blob/main/website/image/quiz.png?raw=true" width="30%" alt="Quiz Selection">
  <img src="https://github.com/Kishore735/Quiz/blob/main/website/image/result.png?raw=true" width="30%" alt="Results Screen">
  <img src="https://github.com/Kishore735/Quiz/blob/main/website/image/chatbot.png?raw=true" width="30%" alt="Chat-bot">
</div>

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 🙏 Acknowledgements

- [Firebase](https://firebase.google.com/) for backend services
- [Chart.js](https://www.chartjs.org/) for data visualization
- [Inter Font](https://fonts.google.com/specimen/Inter) for typography
