import express from "express";
import { getCareers, createCareer } from "../controllers/careerController";

const careerRoutes = express.Router();

careerRoutes.get("/", getCareers);
careerRoutes.post("/", createCareer);

export default careerRoutes;
