import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db";
import User from "./User";

class Appointment extends Model {
  public id!: number;
  public userId!: number;
  public date!: Date;
  public status!: string;
}

Appointment.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: User, key: "id" },
    },
    date: { type: DataTypes.DATE, allowNull: false },
    status: { type: DataTypes.STRING, allowNull: false },
  },
  { sequelize, tableName: "appointments" }
);

export default Appointment;
