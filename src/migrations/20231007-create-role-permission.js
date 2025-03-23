// src/migrations/20231001-create-role-permission.js
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('role_permissions', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      roleId: {
        type: Sequelize.INTEGER,
        references: { model: 'roles', key: 'id' },
        onDelete: "CASCADE",
      },
      permissionId: {
        type: Sequelize.INTEGER,
        references: { model: 'permissions', key: 'id' },
        onDelete: "CASCADE",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('role_permissions');
  },
};