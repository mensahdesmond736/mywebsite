//Questions
const questions = [
    {
        question: "What is known as the 'brain' of the computer?",
        options: ["RAM", "Hard Drive", "CPU", "GPU"],
        answer: 2 //Index of the correct answer
    },
    {
        question: "Which of these is a permanent storage device?",
        options: ["RAM", "Cache", "SSD (Solid State Drive)", "Register"],
        answer: 2
    },
    {
        question: "What does BIOS stand for?",
        options: ["Binary Input Output System", "Basic Input Output System", "Business Integrated Operating Software", "Basic Internal Operating System"],
        answer: 1
    },
    {
        question: "Which of the following is an operating system",
        options: ["Google Chrome", "Microsoft Word", "Linux", "Python"],
        answer: 2
    },
    {
        question: "What does URL stand for?",
        options: ["Uniform Resource Locator", "Universal Remote Link", "Unique Road Link", "United Resource Link"],
        answer: 0
    },
    {
        question: "How many bits make up one Byte?",
        options: ["4 bits", "8 bits", "10 bits", "16 bits"],
        answer: 1
    },
    {
        question: "Which numbering system do computers use for internal processing?",
        options: ["Decimal", "Hexadecimal", "Octal", "Binary"],
        answer: 3
    },
    {
        question: "Which protocol is used to secure data sent over the internet?",
        options: ["HTTP", "FTP", "HTTPS", "SMTP"],
        answer: 2
    },
    {
        question: "In programming, what is a 'bug'?",
        options: ["A fast-running code", "An error or flaw in a program", "A type of computer virus", "A hardware connection tool"],
        answer: 1
    },
    {
        question: "What is the main function of a Firewall?",
        options: ["A cool down the computer", "To prevent unauthorized access to a network", "To increase internet speed", "To delete old files"],
        answer: 1
    }
];

// 2. STATE VARIABLES
let currentQuestionIndex = 0; // Tracks which question the user is on
let timeLimit = 300; // 5 minutes total
let userChoices = {}; // Stores selection like {0: "8 bits"}
let timerInterval;

function printQuestions() {
    // Match the actual HTML structure: question heading is inside .questionBox h2
    const questionHeading = document.querySelector('.questionBox h2');
    const optionContainer = document.querySelector('.optionBox');
    const qCountDisplay = document.querySelector('.qCount');
    const nextBtn = document.getElementById('next-btn');
    const prevBtn = document.getElementById('prev-btn');

    if (!questionHeading || !optionContainer || !qCountDisplay) return;

    optionContainer.innerHTML = '';

    // Load data for the current index
    const currentData = questions[currentQuestionIndex];
    questionHeading.innerText = currentData.question;
    qCountDisplay.innerText = `Question ${currentQuestionIndex + 1} of ${questions.length}`;

    currentData.options.forEach((opt) => {
        const span = document.createElement('span');
        span.innerText = opt;
        span.classList.add('option-item');

        // Highlight selection if user has clicked it
        if (userChoices[currentQuestionIndex] === opt) {
            span.classList.add('selected');
        }

        span.onclick = () => {
            userChoices[currentQuestionIndex] = opt;
            printQuestions(); 
        };
        optionContainer.appendChild(span);
    });

    // Handle button text and visibility
    prevBtn.style.visibility = (currentQuestionIndex === 0) ? 'hidden' : 'visible';
    nextBtn.innerText = (currentQuestionIndex === questions.length - 1) ? 'Submit Quiz' : 'Next Question';
}

/**
 * 4. NAVIGATION LOGIC
 * Moves forward/backward and handles the final submission popup.
 */
function handleNext() {
    if (currentQuestionIndex === questions.length - 1) {
        let answered = Object.keys(userChoices).length;
        if (confirm(`Are you sure? You answered ${answered} of ${questions.length} questions.`)) {
            finishQuiz();
        }
    } else {
        currentQuestionIndex++;
        printQuestions();
    }
}

function handlePrev() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        printQuestions();
    }
}

// REVIEW OVERLAY
function openReview() {
    const overlay = document.getElementById('reviewOverlay');
    const list = document.getElementById('reviewList');
    list.innerHTML = '';
    questions.forEach((q, i) => {
        const div = document.createElement('div');
        div.className = 'review-item-brief';
        const user = userChoices[i] || 'Skipped';
        const userText = user === 'Skipped' ? 'Skipped' : user;
        div.innerHTML = `<strong>Q${i+1}</strong>: ${q.question}<br><small>Your: ${userText}</small>`;
        div.onclick = () => {
            overlay.style.display = 'none';
            currentQuestionIndex = i;
            printQuestions();
        };
        list.appendChild(div);
    });
    overlay.style.display = 'flex';
}

function closeReview() {
    document.getElementById('reviewOverlay').style.display = 'none';
}

//timer function
function startTimer() {
    const timerBox = document.querySelector(".timerBox");
    timerInterval = setInterval(() => {
        let mins = Math.floor(timeLimit / 60);
        let secs = timeLimit % 60;
       
        timerBox.innerText = `Time Left: ${mins}:${secs < 10 ? '0' + secs : secs}`;

        if (timeLimit <= 0) {
            clearInterval(timerInterval);
            finishQuiz();
        }
        timeLimit--;
    }, 1000);
}

function finishQuiz() {
    clearInterval(timerInterval);
    document.getElementById("questionScreen").style.display = "none";
    document.getElementById("result-box").style.display = "block";

    let score = 0;
    questions.forEach((q, i) => {
        if (userChoices[i] === q.options[q.answer]) {
            score++;
        }
    });

    document.getElementById("final-score").innerText = `${score} / ${questions.length}`;

    // Build the post-submit review (read-only) into the #review element
    const reviewContainer = document.getElementById('review');
    reviewContainer.innerHTML = '';
    questions.forEach((q, i) => {
        const div = document.createElement('div');
        div.className = 'review-item';
        const user = userChoices[i] || 'Skipped';
        const isCorrect = user === q.options[q.answer];
        div.style.borderLeftColor = isCorrect ? 'green' : 'red';
        div.innerHTML = `<p><strong>Q${i+1}:</strong> ${q.question}</p>
            <p>Your Answer: <strong>${user}</strong></p>
            ${!isCorrect ? `<p style="color:green">Correct: ${q.options[q.answer]}</p>` : ''}`;
        reviewContainer.appendChild(div);
    });    
}

window.onload = () => {
    printQuestions();
    startTimer();
    document.getElementById("next-btn").onclick = handleNext;
    document.getElementById("prev-btn").onclick = handlePrev;
};