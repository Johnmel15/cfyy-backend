import express from "express";
import { getUsers, createUser } from "../controllers/userController";

const userRoutes = express.Router();

userRoutes.get("/", getUsers);
userRoutes.post("/", createUser);

export default userRoutes;
