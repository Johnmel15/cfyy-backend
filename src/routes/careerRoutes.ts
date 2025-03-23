import express from "express";
import { getCareers, createCareer } from "../controllers/careerController";
import authenticate from "../middleware/authMiddleware";

const careerRoutes = express.Router();
careerRoutes.use(authenticate);

careerRoutes.get("/", getCareers);
careerRoutes.post("/", createCareer);

export default careerRoutes;
