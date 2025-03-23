import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db";

class Role extends Model {
  public id!: number;
  public name!: string; // e.g., Super Admin, Admin, Nurse
}

Role.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
  },
  { sequelize, tableName: "roles" }
);

export default Role;
