'use strict';

module.exports = {
  up: async (queryInterface) => {
    const roles = [
      { name: "Super Admin", createdAt: new Date(), updatedAt: new Date() },
      { name: "Admin", createdAt: new Date(), updatedAt: new Date() },
      { name: "Nurse", createdAt: new Date(), updatedAt: new Date() },
    ];

    const permissions = [
      { action: "settings:view", createdAt: new Date(), updatedAt: new Date() },
      { action: "settings:edit", createdAt: new Date(), updatedAt: new Date() },
      { action: "settings:delete", createdAt: new Date(), updatedAt: new Date() },
      { action: "users:view", createdAt: new Date(), updatedAt: new Date() },
      { action: "users:add", createdAt: new Date(), updatedAt: new Date() },
      { action: "users:edit", createdAt: new Date(), updatedAt: new Date() },
      { action: "users:delete", createdAt: new Date(), updatedAt: new Date() },
      { action: "appointments:view", createdAt: new Date(), updatedAt: new Date() },
      { action: "appointments:add", createdAt: new Date(), updatedAt: new Date() },
      { action: "appointments:edit", createdAt: new Date(), updatedAt: new Date() },
      { action: "appointments:delete", createdAt: new Date(), updatedAt: new Date() },
      { action: "appointments:confirm", createdAt: new Date(), updatedAt: new Date() },
      { action: "careers:view", createdAt: new Date(), updatedAt: new Date() },
      { action: "careers:add", createdAt: new Date(), updatedAt: new Date() },
      { action: "careers:edit", createdAt: new Date(), updatedAt: new Date() },
      { action: "careers:delete", createdAt: new Date(), updatedAt: new Date() },
    ];

    await queryInterface.bulkInsert("roles", roles);
    await queryInterface.bulkInsert("permissions", permissions);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete("roles", {});
    await queryInterface.bulkDelete("permissions", {});
  },
};