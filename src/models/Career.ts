import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db"; // Ensure the correct path to your DB config

class Career extends Model {
  public id!: number;
  public title!: string;
  public description!: string;
}

Career.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "careers",
    timestamps: true, // Keeps createdAt & updatedAt fields
  }
);

export default Career;
