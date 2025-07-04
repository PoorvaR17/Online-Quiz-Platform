fetch("http://localhost:5000/api/contact")
    .then(res => res.json())
    .then(data => {
        const container = document.getElementById("messageList");

        if (data.length === 0) {
            container.innerHTML = "<p>No messages yet.</p>";
            return;
        }

        data.forEach(msg => {
            const div = document.createElement("div");
            div.className = "message-card";
            div.innerHTML = `
                <strong>Name:</strong> ${msg.name}<br>
                <strong>Email:</strong> ${msg.email}<br>
                <strong>Message:</strong> ${msg.message}<br>
                <small><em>Received on: ${new Date(msg.date).toLocaleString()}</em></small>
            `;
            container.appendChild(div);
        });
    })
    .catch(err => {
        console.error("Error fetching messages:", err);
        document.getElementById("messageList").innerHTML = "<p>Failed to load messages.</p>";
    });
