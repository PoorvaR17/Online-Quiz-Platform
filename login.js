




let selectedRole = "user"; // Default role

// Function to select role
function selectRole(role) {
    selectedRole = role;
    document.getElementById("userBtn").classList.remove("active");
    document.getElementById("adminBtn").classList.remove("active");
    document.getElementById(role + "Btn").classList.add("active");
}

// Function to handle login
function login() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!username || !password) {
        alert("Please enter both username and password.");
        return;
    }

    if (selectedRole === "admin") {
        if (username === "admin123" && password === "admin@123") {
            alert("Admin login successful!");
            window.location.href = "admin.html"; // Redirect to admin dashboard
        } else {
            alert("Invalid admin credentials.");
        }
    } else {
        // Any user can log in without validation
        alert("User login successful!");
        window.location.href = "user.html"; // Redirect to user dashboard
    }
}
