import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db";
import Role from "./Role"; // Import Role for association
import Permission from "./Permission"; // Import Permission for association

class RolePermission extends Model {
  public roleId!: number;
  public permissionId!: number;
  public Role?: Role; // This will hold the associated Role instance
  public Permission?: Permission;
}

RolePermission.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    roleId: {
      type: DataTypes.INTEGER,
      references: { model: Role, key: "id" },
      onDelete: "CASCADE",
    },
    permissionId: {
      type: DataTypes.INTEGER,
      references: { model: Permission, key: "id" },
      onDelete: "CASCADE",
    },
  },
  { sequelize, tableName: "role_permissions" }
);

export default RolePermission;
