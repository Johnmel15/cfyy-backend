'use strict';

const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Define roles to associate with users
    const roles = await queryInterface.sequelize.query(
      `SELECT id, name FROM roles WHERE name IN ('Super Admin', 'Admin', 'Nurse')`
    );

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

    // Get the inserted users to associate them with roles
    const users = await queryInterface.sequelize.query(
      `SELECT id, email FROM users WHERE email IN ('john.doe@example.com', 'jane.smith@example.com', 'alice.johnson@example.com')`
    );

    const userRoles = [];

    // Associate users with roles
    users[0].forEach((user, index) => {
      userRoles.push({
        userId: user.id,
        roleId: roles[0][index].id, // Assuming the order of users matches the order of roles
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    });

    // Insert user-role associations
    await queryInterface.bulkInsert('user_roles', userRoles);

    // Define permissions for each role
    const permissions = await queryInterface.sequelize.query(
      `SELECT id, action FROM permissions`
    );

    const rolePermissions = [];

    // Associate permissions with roles
    roles[0].forEach(role => {
      let rolePerms = [];
      if (role.name === 'Super Admin' || role.name === 'Admin') {
        // Super Admin and Admin have all permissions
        rolePerms = permissions[0]; // All permissions
      } else if (role.name === 'Nurse') {
        // Nurse has limited permissions
        rolePerms = permissions[0].filter(p =>
          ['appointments:view', 'careers:view'].includes(p.action)
        );
      }

      rolePerms.forEach(permission => {
        rolePermissions.push({
          roleId: role.id,
          permissionId: permission.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      });
    });

    // Insert role-permission associations
    await queryInterface.bulkInsert('role_permissions', rolePermissions);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('role_permissions', null, {});
    await queryInterface.bulkDelete('user_roles', null, {});
    await queryInterface.bulkDelete('users', null, {});
  },
};