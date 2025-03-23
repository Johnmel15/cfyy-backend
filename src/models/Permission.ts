import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db";

class Permission extends Model {
  public id!: number;
  public action!: string; // e.g., settings:view
}

Permission.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    action: { type: DataTypes.STRING, allowNull: false, unique: true },
  },
  { sequelize, tableName: "permissions" }
);

export default Permission;
