const express = require('express');
const router = express.Router();

// Mock Users (for demonstration purposes)
let users = [];

// User Registration Route
router.post('/register', (req, res) => {
    const { username, password } = req.body;
    // Check if user exists
    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists.' });
    }
    // Create new user
    const newUser = { username, password }; // In real application, password should be hashed.
    users.push(newUser);
    return res.status(201).json({ message: 'User registered successfully.' });
});

// User Login Route
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(user => user.username === username && user.password === password);
    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials.' });
    }
    return res.status(200).json({ message: 'Login successful.' });
});

// Get User Profile Route
router.get('/profile/:username', (req, res) => {
    const { username } = req.params;
    const user = users.find(user => user.username === username);
    if (!user) {
        return res.status(404).json({ message: 'User not found.' });
    }
    return res.status(200).json({ username: user.username });
});

// Update User Profile Route
router.put('/profile/:username', (req, res) => {
    const { username } = req.params;
    const { newUsername, newPassword } = req.body;
    const userIndex = users.findIndex(user => user.username === username);
    if (userIndex === -1) {
        return res.status(404).json({ message: 'User not found.' });
    }
    users[userIndex] = { username: newUsername || username, password: newPassword || users[userIndex].password };
    return res.status(200).json({ message: 'Profile updated successfully.' });
});

module.exports = router;