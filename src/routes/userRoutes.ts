import express from "express";
import { getUsers, createUser } from "../controllers/userController";
import authenticate from "../middleware/authMiddleware";

const userRoutes = express.Router();
userRoutes.use(authenticate);

userRoutes.get("/", getUsers);
userRoutes.post("/", createUser);

export default userRoutes;
