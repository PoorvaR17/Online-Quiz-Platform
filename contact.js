document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.querySelector("input[type='text']").value;
    const email = document.querySelector("input[type='email']").value;
    const message = document.querySelector("textarea").value;

    if (!name || !email || !message) {
        alert("Please fill in all fields.");
        return;
    }

    alert(`Thank you ${name}! Your message has been received. We’ll respond shortly.`);
    this.reset();
});
