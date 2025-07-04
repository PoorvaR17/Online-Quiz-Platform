
// const params = new URLSearchParams(window.location.search);
// const quizIndex = Number(params.get("quizIndex")); // Ensure it's a number

// let quizzes = JSON.parse(localStorage.getItem("quizzes")) || [];

// if (!quizzes || quizzes.length === 0 || quizIndex < 0 || quizIndex >= quizzes.length) {
//     alert("Quiz not found!");
//     window.location.href = "user.html";
// } else {
//     let selectedQuiz = quizzes[quizIndex];
//     document.getElementById("quizTitle").textContent = selectedQuiz.title;

//     // Display quiz questions
//     let questionContainer = document.getElementById("questionContainer");
//     questionContainer.innerHTML = ""; // Clear any previous content

//     selectedQuiz.questions.forEach((q, qIndex) => {
//         let div = document.createElement("div");
//         div.innerHTML = `<p><strong>${qIndex + 1}. ${q.question}</strong></p>`;

//         q.options.forEach((option, optIndex) => {
//             div.innerHTML += `
//                 <label>
//                     <input type="radio" name="question${qIndex}" value="${optIndex}">
//                     ${option}
//                 </label><br>
//             `;
//         });

//         questionContainer.appendChild(div);
//     });
// }

// // Submit quiz and calculate score
// function submitQuiz() {
//     let score = 0;
//     let selectedQuiz = quizzes[quizIndex];

//     selectedQuiz.questions.forEach((q, qIndex) => {
//         let selectedOption = document.querySelector(`input[name="question${qIndex}"]:checked`);
//         if (selectedOption && parseInt(selectedOption.value) === q.correct) {
//             score++;
//         }

//     });

//     // Store user score in localStorage
//     localStorage.setItem("userScore", JSON.stringify({ quiz: selectedQuiz.title, score: score }));

//     // Redirect to result page
//     window.location.href = "result.html";
// }

// Load quiz data
const params = new URLSearchParams(window.location.search);
const quizIndex = params.get("quizIndex");
let quizzes = JSON.parse(localStorage.getItem("quizzes")) || [];
let selectedQuiz = quizzes[quizIndex];
let quizDuration = 120; // time in seconds (2 min)

if (!selectedQuiz) {
    alert("Quiz not found!");
    window.location.href = "user.html";
}

// Display quiz title
document.getElementById("quizTitle").textContent = selectedQuiz.title;

// Display timer
const timerBox = document.createElement("div");
timerBox.id = "timer";
timerBox.style = "font-size: 18px; color: red; text-align: right; margin-bottom: 10px;";
document.querySelector(".quiz-container").prepend(timerBox);

// Render questions
let questionContainer = document.getElementById("questionContainer");

selectedQuiz.questions.forEach((q, qIndex) => {
    let div = document.createElement("div");
    div.innerHTML = `<p><strong>${qIndex + 1}. ${q.question}</strong> <span style="color:#4CAF50;">(${q.marks} marks)</span></p>`;

    q.options.forEach((option, optIndex) => {
        div.innerHTML += `
            <label>
                <input type="checkbox" name="question${qIndex}" value="${optIndex}">
                ${option}
            </label><br>`;
    });

    questionContainer.appendChild(div);
});

// Quiz timer logic
let remainingTime = quizDuration;
let timerInterval = setInterval(() => {
    let minutes = Math.floor(remainingTime / 60);
    let seconds = remainingTime % 60;
    document.getElementById("timer").textContent = `Time Left: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

    if (--remainingTime < 0) {
        clearInterval(timerInterval);
        alert("Time's up! Submitting quiz...");
        submitQuiz();
    }
}, 1000);

// Submit quiz and calculate score
function submitQuiz() {
    clearInterval(timerInterval);

    let totalMarks = 0;
    let obtainedMarks = 0;

    selectedQuiz.questions.forEach((q, qIndex) => {
        totalMarks += q.marks;
        console.log("total", q.marks)

        let selectedOptions = Array.from(document.querySelectorAll(`input[name="question${qIndex}"]:checked`)).map(
            input => parseInt(input.value)
        );

        let correctAnswers = Array.isArray(q.correct) ? q.correct : [q.correct];
        let isCorrect = selectedOptions.length === correctAnswers.length &&
            selectedOptions.every(opt => correctAnswers.includes(opt));

        if (isCorrect) {
            obtainedMarks += q.marks;
        }
    });

    let percentage = Math.round((obtainedMarks / totalMarks) * 100);

    localStorage.setItem("userScore", JSON.stringify({
        quiz: selectedQuiz.title,
        score: obtainedMarks,
        total: totalMarks,
        percentage: percentage
    }));

    window.location.href = "result.html";
}

