import sequelize from "../config/db";
import User from "./User";
import Role from "./Role";
import Permission from "./Permission";
import UserRole from "./UserRole";
import RolePermission from "./RolePermission";

// Define associations after all models are imported
Role.hasMany(UserRole, { foreignKey: "roleId" });
UserRole.belongsTo(Role, { foreignKey: "roleId" });

User.hasMany(UserRole, { foreignKey: "userId" });
UserRole.belongsTo(User, { foreignKey: "userId" });

Role.hasMany(RolePermission, { foreignKey: "roleId" });
RolePermission.belongsTo(Role, { foreignKey: "roleId" });

Permission.hasMany(RolePermission, { foreignKey: "permissionId" });
RolePermission.belongsTo(Permission, { foreignKey: "permissionId" });

export { sequelize, User, Role, Permission, UserRole, RolePermission };
