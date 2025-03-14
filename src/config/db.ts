import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
import { User } from "../models/User";
import { Appointment } from "../models/Appointment";
import { Career } from "../models/Career";

dotenv.config();

const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  dialect: "mysql",
  models: [User, Appointment, Career], // Register ALL models here
  logging: false,
});

export default sequelize;
