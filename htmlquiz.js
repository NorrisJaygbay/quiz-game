const questions = [
    // 1
    {
        question: "What is the meaning of HTML?",
        answers: ["Hyper Text MarkUp Length", "Hyper Text Mark Language", "Hyper Text MarkUp Language", "Hyper Text MarkingUp Language"],
        correct: 2
    },
    // 2
    {
        question: "How do you create a hyperlink in HTML?",
        answers: ["<a hraf=\"\"></a>", "<a ref=\"\"></a>", "<a hrcf=\"\"></a>", "<a href=\"\"></a>"],
        correct: 3
    },
    // 3
    {
        question: "How many ways we use a style in HTML?",
        answers: ["4 ways", "3 ways", "5 ways", "2 ways"],
        correct: 1
    },
    // 4
    {
        question: "How do we insert a comment in HTML?",
        answers: ["<!--comment>", "<--!comment-->", "<--comment-->", "<!--comment-->"],
        correct: 3
    },
    // 5
    {
        question: "What are HTML Attributes?",
        answers: ["Properties that can be remove form HTML tag", "Properties that can be deleted form HTML tag", "Properties that can be added to an HTML tag", "Non of the above"],
        correct: 2
    },
    // 6
    {
        question: "How do you define an image tag in HTML?",
        answers: ["<img src=\"\">", "<image src=\"\">", "<img src\"\">", "<img sac=\"\">"],
        correct: 0
    },
    // 7
    {
        question: "What are the different types of headings in HTML?",
        answers: ["h1 to h4", "h1 to h5", "h1 to h7", "h1 to h6"],
        correct: 3
    },
    // 8
    {
        question: "How do you define an audio tag in HTML?",
        answers: ["<audio sac=\"\"></audio>", "<audio sre=\"\"></audio>", "<audio src=\"\"></audio>", "<audie src=\"\"></audie>"],
        correct: 2
    },
     // 9
     {
        question: "Where do we use the alt attribute in HTML?",
        answers: ["<p></p> tag", "<image src=\"\">", "<img sac=\"\">", "None of the above"],
        correct: 3
    },
     // 10
     {
        question: "How are hyperlinks inserted in the HTML webpage?",
        answers: ["<a hre=\"URL\">", "<a href=\"URL\"><a/>", "<a ref=\"URL\"></a>", "<a href=\"URL\"></a>"],
        correct: 3
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