import express from "express";
import AppointmentController from "../controllers/appointmentController";
import authorize from "../middleware/authorize";
import authenticate from "../middleware/authMiddleware";

const appointmentRoutes = express.Router();
appointmentRoutes.use(authenticate);

appointmentRoutes.get(
  "/",
  authorize("appointments:view"),
  AppointmentController.getAppointments
);
appointmentRoutes.post(
  "/",
  authorize("appointments:add"),
  AppointmentController.createAppointment
);

export default appointmentRoutes;
