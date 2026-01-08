const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.post("/contact", (req, res) => {
    const { firstName, lastName, email, phone, subject, message, age } = req.body;

    // simple server-side validation
    const errors = [];
    if (!firstName || typeof firstName !== 'string' || !firstName.trim()) errors.push('firstName is required');
    if (!email || typeof email !== 'string' || !email.trim()) errors.push('email is required');
    if (!subject || typeof subject !== 'string' || !subject.trim()) errors.push('subject is required');
    if (!message || typeof message !== 'string' || !message.trim()) errors.push('message is required');

    // validate age if provided: must be integer >= 0
    if (age !== undefined) {
        const ageNum = Number(age);
        if (!Number.isInteger(ageNum) || ageNum < 0) {
            errors.push('age must be an integer >= 0');
        }
    }

    if (errors.length) {
        return res.status(400).json({ message: 'Validation failed', errors });
    }

    const name = [firstName, lastName].filter(Boolean).join(' ').trim();

    console.log('New Contact Message:');
    console.log('Name:', name || '-');
    console.log('Email:', email);
    console.log('Phone:', phone || '-');
    console.log('Age:', age !== undefined ? age : '-');
    console.log('Subject:', subject);
    console.log('Message:', message);

    res.json({ message: 'Message sent successfully!' });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
