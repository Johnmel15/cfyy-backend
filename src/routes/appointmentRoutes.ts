import express from "express";
import { getAppointments, createAppointment } from "../controllers/appointmentController";

const appointmentRoutes = express.Router();

appointmentRoutes.get("/", getAppointments);
appointmentRoutes.post("/", createAppointment);

export default appointmentRoutes;
