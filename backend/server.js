'use strict';

const express = require('express');
const { Pool } = require('pg');

const app = express();

// PostgreSQL connection configuration
const pool = new Pool({
    user: 'your_username', // replace with your DB username
    host: 'localhost', // replace with your DB host
    database: 'your_database', // replace with your DB name
    password: 'your_password', // replace with your DB password
    port: 5432, // default PostgreSQL port
});

// Test the database connection
pool.connect(err => {
    if (err) {
        console.error('Database connection error', err.stack);
    } else {
        console.log('Connected to the database');
    }
});

// Import app.js (assuming it's in the same directory)
require('./app');

// Start the Express server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
