import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db";
import User from "./User"; // Import User for association
import Role from "./Role"; // Import Role for association

class UserRole extends Model {
  public userId!: number;
  public roleId!: number;
  public Role?: Role;
}

UserRole.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userId: {
      type: DataTypes.INTEGER,
      references: { model: User, key: "id" },
      onDelete: "CASCADE",
    },
    roleId: {
      type: DataTypes.INTEGER,
      references: { model: Role, key: "id" },
      onDelete: "CASCADE",
    },
  },
  { sequelize, tableName: "user_roles" }
);

export default UserRole;
