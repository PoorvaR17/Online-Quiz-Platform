// Load quizzes from localStorage
function loadQuizzes() {
    let quizzes = JSON.parse(localStorage.getItem("quizzes")) || [];
    let quizList = document.getElementById("quizList");
    quizList.innerHTML = "";

    quizzes.forEach((quiz, index) => {
        let li = document.createElement("li");
        li.textContent = quiz.title;
        li.onclick = () => startQuiz(index);
        quizList.appendChild(li);
    });
}

// Redirect to quiz page with selected quiz index
function startQuiz(index) {
    window.location.href = `quiz.html?quizIndex=${index}`;
}

// Load quizzes when page loads
window.onload = loadQuizzes;
