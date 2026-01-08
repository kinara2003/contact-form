document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault();

    // gather values from the enhanced form
    const data = {
        firstName: document.getElementById("firstName").value.trim(),
        lastName: document.getElementById("lastName").value.trim(),
        email: document.getElementById("email").value.trim(),
        phone: document.getElementById("phone").value.trim(),
        age: document.getElementById("age").value,
        subject: document.getElementById("subject").value.trim(),
        message: document.getElementById("message").value.trim()
    };

    // basic client-side validation
    if (!data.firstName || !data.email || !data.subject || !data.message) {
        document.getElementById("response").innerText = "Please fill in the required fields.";
        return;
    }

    // validate age if provided: must be an integer >= 0
    if (data.age) {
        const ageNum = parseInt(data.age, 10);
        if (Number.isNaN(ageNum) || ageNum < 0) {
            document.getElementById("response").innerText = "Please provide a valid non-negative age.";
            return;
        }
        data.age = ageNum;
    } else {
        // remove empty age so backend receives undefined instead of empty string
        delete data.age;
    }

    fetch("http://localhost:3000/contact", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(response => {
        document.getElementById("response").innerText = response.message || "Message sent.";
        document.getElementById("contactForm").reset();
    })
    .catch(() => {
        document.getElementById("response").innerText = "Error sending message";
    });
});
