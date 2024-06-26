const questions = [
    // 1
    {
        question: "What is the meaning of CSS?",
        answers: ["Cascading Styling Sheets", "Cascaling Style Sheets", "Cascadting Style Sheets", "Cascading Style Sheets"],
        correct: 3
    },
    // 2
    {
        question: "How do we call the class selector in CSS?",
        answers: ["!para{}", "#para{}", ",para{}", ".para{}"],
        correct: 3
    },
    // 3
    {
        question: "How do we call the id selector in CSS?",
        answers: [".para{}", "#.para{}", "#para{}", "!para{}"],
        correct: 2
    },
    // 4
    {
        question: "How do we use external CSS?",
        answers: ["<link src=\"\" href=\"\">", "<link icon=\"\" href=\"\">", "<link rel=\"\" ref=\"\">", "<link rel=\"\" href=\"\">"],
        correct: 3
    },
    // 5
    {
        question: "How many ways we applied CSS to HTML?",
        answers: ["2 ways", "33 ways", "4 ways", "Non of the above"],
        correct: 3
    },
    // 6
    {
        question: "Which property is used to change the background color?",
        answers: ["dackground-color: blue;", "background-color: blue;", "background-collor: blue;", "bacckground-coloor: blue;"],
        correct: 1
    },
    // 7
    {
        question: "In CSS, how can comments be added?",
        answers: ["/*comment/", "/*comment*/", "*/comment/*", "<!--comment-->"],
        correct: 1
    },
    // 8
    {
        question: "How do we define a universal selector?",
        answers: ["**{}", "#{}", "*{}", "*#{}"],
        correct: 2
    },
     // 9
     {
        question: "How can you target h1, h2 and h5 using the same styling?",
        answers: ["h1, h3, h5 {color: red;}", ".h1, .h2, .h5 {color: red;}", "h1 h2 h5 {color: red;}", "h1, h2, h5 {color: red;}"],
        correct: 3
    },
     // 10
     {
        question: "Is padding and margin the same in CSS?",
        answers: ["Yes", "Some times", "No", "None of the above"],
        correct: 2
    }
];

let currentQuestionIndex = 0;
let selectedAnswerIndex = null;
let score = 0;
let score_Add = 0;
let userAnswers = [];
let main_Score = document.querySelector('.score-reduce');

function startQuiz(){
    currentQuestionIndex = 0;
    selectedAnswerIndex = null;
    score = 0;
    // main_Score.innerHTML = score_Add;
    userAnswers = [];
    document.querySelector('.btn-next-control').style.display = 'none';
    document.querySelector('.score-section').style.display = 'none';
    document.querySelector('.review-section').style.display = 'none';
    document.querySelector('.quiz').style.display = 'block';
    showQuestion();
    scoreReset();
}

function scoreReset(){
    score_Add = 0;
    main_Score.innerHTML = score_Add;
}

function showQuestion() {
    const questionElement = document.getElementById('question');
    const answerButtonsElement = document.getElementById('answer-buttons');
    const currentQuestion = questions[currentQuestionIndex];

    questionElement.innerText = currentQuestion.question;
    const buttons = answerButtonsElement.getElementsByTagName('button');
    Array.from(buttons).forEach((button, index) => {
        button.innerText = currentQuestion.answers[index];
        button.classList.remove('correct', 'incorrect');
        button.disabled = false;
    });
}

function selectAnswer(index) {
    selectedAnswerIndex = index;
    const answerButtonsElement = document.getElementById('answer-buttons');
    const currentQuestion = questions[currentQuestionIndex];
    const buttons = answerButtonsElement.getElementsByTagName('button');
    Array.from(buttons).forEach((button, idx) => {
        button.disabled = true;
        if (idx === currentQuestion.correct) {
            button.classList.add('correct');
            if (idx === selectedAnswerIndex) {
                score++;
                score_Add++;
                main_Score.innerHTML = score_Add;
            }
        }
        if (idx === selectedAnswerIndex && idx !== currentQuestion.correct) {
            button.classList.add('incorrect');
            score_Add++;
            main_Score.innerHTML = score_Add;
        }
    });
    userAnswers.push({ question: currentQuestion.question, correctAnswer: currentQuestion.answers[currentQuestion.correct], userAnswer: currentQuestion.answers[selectedAnswerIndex] });

    setTimeout(()=>{
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion();
            document.querySelector('.btn-next-control').style.display = 'none';
            selectedAnswerIndex = null;
        } else {
            showScore();
        }
    }, 1000);
}

function showScore() {
    document.querySelector('.quiz').style.display = 'none';
    const scoreElement = document.getElementById('score');
    scoreElement.innerText = `You score: ${score} out of ${questions.length}`;
    document.querySelector('.score-section').style.display = 'block';
}


function reviewAnswers() {
    // Hide the score section
    document.querySelector('.score-section').style.display = 'none';
    
    // Select the review container and clear its contents
    const reviewContainer = document.getElementById('review-container');
    reviewContainer.innerHTML = '';
    
    // Iterate through user answers and display each question with the correct and user answers
    userAnswers.forEach((answer, index) => {
        // Create a div for each question
        const questionDiv = document.createElement('div');
        questionDiv.className = 'review-question';
        questionDiv.innerHTML = `<p class="review-question-one">Question ${index + 1}:</p> <p class="review-question-two">${answer.question}</p>`;
        
        // Create a div for the correct answer
        const correctAnswerDiv = document.createElement('div');
        correctAnswerDiv.className = 'review-answer';
        correctAnswerDiv.innerHTML = `<p class="correct-answer">Correct Answer:</p> <p class="correct-answer-one">${answer.correctAnswer}</p>`;
        
        // Create a div for the user's answer and add appropriate class based on correctness
        const userAnswerDiv = document.createElement('div');
        userAnswerDiv.className = 'review-answer';
        userAnswerDiv.innerHTML = `<p class="correct-answer">Your Answer:</p> <p class="${answer.userAnswer === answer.correctAnswer ? 'correct-answer-one' : 'incorrect-answer'}">${answer.userAnswer}</p>`;
        
        // Append the correct and user answers to the question div
        questionDiv.appendChild(correctAnswerDiv);
        questionDiv.appendChild(userAnswerDiv);
        
        // Append the question div to the review container
        reviewContainer.appendChild(questionDiv);
    });
    
    // Display the review section
    document.querySelector('.review-section').style.display = 'block';
}

document.addEventListener('DOMContentLoaded', startQuiz);