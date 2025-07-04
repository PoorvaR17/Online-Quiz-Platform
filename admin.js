// // Array to store questions temporarily
// let questions = [];

// function addQuestion() {
//     let questionText = document.getElementById("questionInput").value;
//     let options = document.querySelectorAll(".option");
//     let correctOption = document.getElementById("correctOption").value;
//     let marks = parseInt(document.getElementById("questionMarks").value);


//     // Ensure all fields are filled
//     if (questionText.trim() === "" || options[0].value.trim() === "" || options[1].value.trim() === "") {
//         alert("Please fill out the question and at least two options.");
//         return;
//     }

//     // Store options as an array
//     let optionValues = [];
//     options.forEach(option => {
//         optionValues.push(option.value.trim());
//     });

//     // Create question object
//     let question = {
//         question: questionText,
//         options: optionValues,
//         correct: parseCorrectOptions(),
//         marks: marks
    
//     };
//     function parseCorrectOptions() {
//         let checkedOptions = [];
//         document.querySelectorAll('.correct-checkbox:checked').forEach(cb => {
//             checkedOptions.push(parseInt(cb.value));
//         });
//         return checkedOptions; // Array of indices
//     }
    

//     // Add question to array
//     questions.push(question);

//     // Update Preview List
//     let listItem = document.createElement("li");
//     listItem.textContent = questionText;
//     document.getElementById("questionsList").appendChild(listItem);

//     // Clear inputs
//     document.getElementById("questionInput").value = "";
//     options.forEach(option => option.value = "");
// }

// Array to store questions temporarily
let questions = [];

function parseCorrectOptions() {
    let checkedOptions = [];
    document.querySelectorAll('.correct-checkbox:checked').forEach(cb => {
        checkedOptions.push(parseInt(cb.value));
    });
    return checkedOptions; // Array of indices
}

function addQuestion() {
    let questionText = document.getElementById("questionInput").value;
    let options = document.querySelectorAll(".option");
    let marks = parseInt(document.getElementById("questionMarks").value);
    let correctAnswers = parseCorrectOptions();

    // Ensure all fields are filled
    if (
        questionText.trim() === "" ||
        options[0].value.trim() === "" ||
        options[1].value.trim() === "" ||
        isNaN(marks) ||
        correctAnswers.length === 0
    ) {
        alert("Please fill out the question, at least two options, valid marks, and select correct answers.");
        return;
    }

    // Store options as an array
    let optionValues = [];
    options.forEach(option => optionValues.push(option.value.trim()));

    // Create question object
    let question = {
        question: questionText,
        options: optionValues,
        correct: correctAnswers,
        marks: marks
    };

    // Add question to array
    questions.push(question);

    // Update Preview List
    let listItem = document.createElement("li");
    listItem.textContent = `${questionText} (${marks} marks)`;
    document.getElementById("questionsList").appendChild(listItem);

    // Clear inputs
    document.getElementById("questionInput").value = "";
    document.getElementById("questionMarks").value = "";
    options.forEach(option => option.value = "");
    document.querySelectorAll('.correct-checkbox').forEach(cb => cb.checked = false);
}


function saveQuiz() {
    let quizTitle = document.getElementById("quizTitle").value.trim();

    if (quizTitle === "" || questions.length === 0) {
        alert("Quiz must have a title and at least one question.");
        return;
    }

    // Load existing quizzes from localStorage
    let quizzes = JSON.parse(localStorage.getItem("quizzes")) || [];

    // Create quiz object
    let newQuiz = {
        title: quizTitle,
        questions: questions
    };

    // Add new quiz to quizzes array
    quizzes.push(newQuiz);

    // Store updated quizzes in localStorage
    localStorage.setItem("quizzes", JSON.stringify(quizzes));

    // Clear form
    document.getElementById("quizTitle").value = "";
    document.getElementById("questionsList").innerHTML = "";
    questions = []; // Reset questions array

    alert("Quiz saved successfully!");
}
document.addEventListener("DOMContentLoaded", loadQuizzes);
let currentEditIndex = null; // Track the quiz being edited

function loadQuizzes() {
    let quizzes = JSON.parse(localStorage.getItem("quizzes")) || [];
    let quizList = document.getElementById("quizList");
    quizList.innerHTML = ""; // Clear previous content

    quizzes.forEach((quiz, index) => {
        let li = document.createElement("li");
        li.innerHTML = `
            <strong>${quiz.title}</strong>
            <button onclick="editQuiz(${index})">Edit</button>
            <button onclick="deleteQuiz(${index})">Delete</button>
        `;
        quizList.appendChild(li);
    });
}

function deleteQuiz(index) {
    let quizzes = JSON.parse(localStorage.getItem("quizzes")) || [];
    quizzes.splice(index, 1); // Remove selected quiz
    localStorage.setItem("quizzes", JSON.stringify(quizzes)); // Save updated list
    loadQuizzes(); // Refresh UI
}

function editQuiz(index) {
    let quizzes = JSON.parse(localStorage.getItem("quizzes")) || [];
    let quiz = quizzes[index];

    currentEditIndex = index; // Store current quiz index

    // Set title
    document.getElementById("editQuizTitle").value = quiz.title;

    // Load questions
    let container = document.getElementById("editQuestionsContainer");
    container.innerHTML = ""; // Clear previous questions
    quiz.questions.forEach((q, qIndex) => {
        let div = document.createElement("div");
        div.innerHTML = `
            <label>Question ${qIndex + 1}:</label>
            <input type="text" value="${q.question}" id="question${qIndex}">
            
            <label>Options:</label>
            ${q.options.map((opt, optIndex) => `
                <input type="text" value="${opt}" id="option${qIndex}_${optIndex}">
            `).join("<br>")}

            <label>Correct Option:</label>
            <select id="correctOption${qIndex}">
                ${q.options.map((opt, optIndex) => `
                    <option value="${optIndex}" ${optIndex == q.correct ? "selected" : ""}>Option ${optIndex + 1}</option>
                `).join("")}
            </select>
        `;
        container.appendChild(div);
    });

    document.getElementById("editModal").style.display = "block"; // Show modal
}

function saveEditedQuiz() {
    let quizzes = JSON.parse(localStorage.getItem("quizzes")) || [];
    let quiz = quizzes[currentEditIndex];

    // Update title
    quiz.title = document.getElementById("editQuizTitle").value;

    // Update questions
    quiz.questions.forEach((q, qIndex) => {
        q.question = document.getElementById(`question${qIndex}`).value;
        q.options = q.options.map((_, optIndex) => 
            document.getElementById(`option${qIndex}_${optIndex}`).value
        );
        q.correct = parseInt(document.getElementById(`correctOption${qIndex}`).value);
    });

    // Save changes to localStorage
    quizzes[currentEditIndex] = quiz;
    localStorage.setItem("quizzes", JSON.stringify(quizzes));
    
    closeModal();
    loadQuizzes();
}






