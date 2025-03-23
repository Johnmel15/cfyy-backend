import app from "./app";
import sequelize from "./config/db";
import dotenv from "dotenv";
import "./models";

dotenv.config();

const PORT = process.env.PORT || 5000;

sequelize.sync({ alter: true }).then(() => {
  console.log("Database connected");
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
