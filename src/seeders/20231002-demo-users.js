// src/seeders/20231001-demo-users.js
'use strict';

const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {

    const userData = [
      {
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: await bcrypt.hash('password123', 10), // Hashing the password
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        password: await bcrypt.hash('password123', 10), // Hashing the password
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Alice Johnson',
        email: 'alice.johnson@example.com',
        password: await bcrypt.hash('password123', 10), // Hashing the password
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    // Insert users
    await queryInterface.bulkInsert('users', userData);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};