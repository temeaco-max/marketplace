'use strict';

const { Sequelize } = require('sequelize');

// Load environment variables from a .env file if available
require('dotenv').config();

// Create a Sequelize instance with PostgreSQL configuration
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
  logging: false, // Set to console.log to see the raw SQL queries
});

// Test the database connection
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;
