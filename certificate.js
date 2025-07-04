function goHome() {
    window.location.href = "user.html";
}

const username = localStorage.getItem("username") || "User";
const quizTitle = selectedQuiz.title;
const certificateScore = percentage;
 {
    localStorage.setItem("certificateData", JSON.stringify({
        name: username,
        quiz: quizTitle,
        percentage: certificateScore,
        date: new Date().toLocaleDateString()
    }));
}

