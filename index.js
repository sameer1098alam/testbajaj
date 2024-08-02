const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const userDetails = {
    fullName: "john_doe",
    dob: "17091999", // DDMMYYYY format
    email: "john@xyz.com",
    rollNumber: "ABCD123"
};

// POST endpoint
app.post('/bfhl', (req, res) => {
    const { data } = req.body;

    if (!data || !Array.isArray(data)) {
        return res.status(400).json({ is_success: false, error: "Invalid input format" });
    }

    const numbers = data.filter(item => !isNaN(item));
    const alphabets = data.filter(item => typeof item === 'string' && /^[a-zA-Z]$/.test(item));
    const highestAlphabet = alphabets.length ? [alphabets.sort((a, b) => a.toLowerCase() > b.toLowerCase() ? -1 : 1)[0]] : [];

    res.json({
        is_success: true,
        user_id: `${userDetails.fullName}_${userDetails.dob}`,
        email: userDetails.email,
        roll_number: userDetails.rollNumber,
        numbers,
        alphabets,
        highest_alphabet: highestAlphabet
    });
});

// GET endpoint
app.get('/bfhl', (req, res) => {
    res.status(200).json({ operation_code: 1 });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
