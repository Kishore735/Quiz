document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const quizContainer = document.querySelector('.quiz-container');
    const questionContainer = document.getElementById('question-container');
    const questionText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const submitBtn = document.getElementById('submit-btn');
    const quizResults = document.getElementById('quiz-results');
    const languageDisplay = document.getElementById('language-display');
    const moduleDisplay = document.getElementById('module-display');

    // Quiz State Variables
    let currentQuestions = [];
    let currentQuestionIndex = 0;
    let score = 0;
    let selectedLanguage = '';
    let selectedModule = '';

    // Time Tracking Variables
    let quizStartTime = 0;
    let questionStartTimes = [];
    let questionTimeTaken = [];

    // Retrieve parameters from sessionStorage
    selectedLanguage = sessionStorage.getItem('selectedLanguageId');
    selectedModule = sessionStorage.getItem('selectedModuleId');

    // Validate language and module
    if (!selectedLanguage || !selectedModule) {
        alert('Please select a language and module from the quiz selection page.');
        window.location.href = 'quiz-selection.html';
        return;
    }

    // Update language and module display
    languageDisplay.textContent = `Language: ${selectedLanguage.toUpperCase()}`;
    moduleDisplay.textContent = `Module: ${selectedModule.replace(/_/g, ' ').toUpperCase()}`;

    // Fetch Random Questions from Firestore
    async function fetchRandomQuestions() {
        try {
            const db = firebase.firestore();
            const moduleRef = db.collection('programming_languages')
                .doc(selectedLanguage)
                .collection('modules')
                .doc(selectedModule);

            const moduleDoc = await moduleRef.get();
            if (!moduleDoc.exists) {
                throw new Error(`Module not found: ${selectedLanguage}/${selectedModule}`);
            }

            const moduleData = moduleDoc.data();
            const allQuestions = moduleData.questions;

            // Validate questions exist
            if (!allQuestions || allQuestions.length === 0) {
                throw new Error(`No questions found in module: ${selectedLanguage}/${selectedModule}`);
            }

            // Shuffle and select 7 random questions (or all if less than 7)
            currentQuestions = shuffleArray(allQuestions).slice(0, Math.min(7, allQuestions.length));
            
            // Initialize time tracking arrays
            questionStartTimes = new Array(currentQuestions.length).fill(0);
            questionTimeTaken = new Array(currentQuestions.length).fill(0);

            // Start quiz timer
            quizStartTime = Date.now();
            
            // Start the quiz
            displayQuestion();
            
            // Setup submit button
            // In the fetchRandomQuestions function, modify the submit button setup:
            submitBtn.classList.remove('hidden');
            submitBtn.disabled = true;
            submitBtn.addEventListener('click', () => {
                if (currentQuestionIndex === currentQuestions.length) {
                    showResults();
                }
            });

            // In the selectOption function, update the submit button logic:
            if (currentQuestionIndex === currentQuestions.length - 1) {
                submitBtn.disabled = false;
            }

        } catch (error) {
            console.error('Error fetching questions:', error);
            alert(`Failed to load quiz: ${error.message}. Redirecting to quiz selection.`);
            window.location.href = 'quiz-selection.html';
        }
    }

    // Shuffle Array Utility Function
    function shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    // Display Current Question
    function displayQuestion() {
        if (currentQuestionIndex < currentQuestions.length) {
            const currentQuestion = currentQuestions[currentQuestionIndex];
            
            // Record start time for this question
            questionStartTimes[currentQuestionIndex] = Date.now();
            
            // Clear previous question
            questionText.textContent = currentQuestion.question_text;
            optionsContainer.innerHTML = '';

            // Shuffle options
            const shuffledOptions = shuffleArray(currentQuestion.options);

            // Create option buttons
            shuffledOptions.forEach(option => {
                const optionBtn = document.createElement('button');
                optionBtn.textContent = option;
                optionBtn.classList.add('option-btn');
                optionBtn.addEventListener('click', () => selectOption(option, currentQuestion));
                optionsContainer.appendChild(optionBtn);
            });
        } else {
            submitBtn.disabled = false;
        }
    }

    // Option Selection Handler
    function selectOption(selectedOption, currentQuestion) {
        // Calculate time taken for the question
        const questionEndTime = Date.now();
        questionTimeTaken[currentQuestionIndex] = questionEndTime - questionStartTimes[currentQuestionIndex];

        // Prevent multiple selections
        if (optionsContainer.querySelector('.selected')) return;

        // Disable further selection on this question
        const optionBtns = document.querySelectorAll('.option-btn');
        optionBtns.forEach(btn => {
            btn.disabled = true;
            
            // Highlight correct and incorrect answers
            if (btn.textContent === currentQuestion.correct_option) {
                btn.classList.add('correct');
            }
            if (btn.textContent === selectedOption && selectedOption !== currentQuestion.correct_option) {
                btn.classList.add('incorrect');
            }
        });

        // Update score
        if (selectedOption === currentQuestion.correct_option) {
            score++;
        }

        // Move to next question
        setTimeout(() => {
            currentQuestionIndex++;
            if (currentQuestionIndex < currentQuestions.length) {
                displayQuestion();
            } else {
                // Enable submit when all questions are answered
                submitBtn.disabled = false;
            }
        }, 1000);
    }

    // Show Quiz Results
    function showResults() {
        // Calculate total quiz time
        const quizEndTime = Date.now();
        const totalQuizTime = quizEndTime - quizStartTime;

        // Calculate total time per question
        const totalTimePerQuestion = questionTimeTaken.reduce((a, b) => a + b, 0);

        // Performance calculation
        const percentage = Math.round((score / currentQuestions.length) * 100);

        // Create results container with detailed analytics
        document.body.innerHTML = `
            <div class="quiz-results-container">
                <h2>Quiz Results</h2>
                <div class="result-details">
                    <p>Total Questions: ${currentQuestions.length}</p>
                    <p>Correct Answers: <strong>${score}/${currentQuestions.length}</strong></p>
                    <p>Percentage: ${percentage}%</p>
                    
                    <h3>Time Analytics</h3>
                    <p>Total Quiz Time: ${(totalQuizTime / 1000).toFixed(2)} seconds</p>
                    <p>Average Time per Question: ${(totalTimePerQuestion / currentQuestions.length / 1000).toFixed(2)} seconds</p>
                </div>
                
                <div class="charts-container">
                    <canvas id="time-per-question-chart"></canvas>
                    <canvas id="performance-chart"></canvas>
                </div>

                <div class="performance-message"></div>
                <button id="retake-btn" class="retake-btn">Retake Quiz</button>
            </div>
        `;

        // Performance message
        const performanceMessageEl = document.querySelector('.performance-message');
        if (percentage >= 80) {
            performanceMessageEl.innerHTML = '<p style="color:green;">Excellent job! 🎉 You really know your stuff!</p>';
        } else if (percentage >= 60) {
            performanceMessageEl.innerHTML = '<p style="color:orange;">Good effort! You\'re on the right track. 👍</p>';
        } else {
            performanceMessageEl.innerHTML = '<p style="color:red;">Keep practicing! You can improve. 💪</p>';
        }

        // Load Chart.js library
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
        script.onload = createCharts;
        document.body.appendChild(script);

        // Add retake button functionality
        document.getElementById('retake-btn').addEventListener('click', () => {
            window.location.reload();
        });
    }

    // Create Charts Function
    // Modify the createCharts function in your existing quiz.js
    function createCharts() {
        // Time per Question Chart
        const timeCtx = document.getElementById('time-per-question-chart').getContext('2d');
        new Chart(timeCtx, {
            type: 'bar',
            data: {
                labels: currentQuestions.map((q, i) => `Q${i + 1}`),
                datasets: [{
                    label: 'Time (sec)',
                    data: questionTimeTaken.map(time => (time / 1000).toFixed(2)),
                    backgroundColor: 'rgba(41, 128, 185, 0.6)', // Softer blue
                    borderColor: 'rgba(41, 128, 185, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Seconds'
                        }
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: 'Time Spent per Question',
                        font: {
                            size: 14
                        }
                    }
                }
            }
        });

        // Performance Pie Chart
        const performanceCtx = document.getElementById('performance-chart').getContext('2d');
        new Chart(performanceCtx, {
            type: 'pie',
            data: {
                labels: ['Correct', 'Incorrect'],
                datasets: [{
                    data: [score, currentQuestions.length - score],
                    backgroundColor: ['#2ecc71', '#e74c3c'], // Green for correct, red for incorrect
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Quiz Performance',
                        font: {
                            size: 14
                        }
                    }
                }
            }
        });
    }

    // Initialize Quiz
    fetchRandomQuestions();
});