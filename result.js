let userScore = JSON.parse(localStorage.getItem("userScore"));

if (userScore) {
    document.getElementById("resultText").textContent = `Quiz: ${userScore.quiz}\nYour Score: ${userScore.score}`;
} else {
    document.getElementById("resultText").textContent = "No quiz results found.";
}

// Redirect to home

