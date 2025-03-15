import { Router } from "express";
import appointmentRoutes from "./appointmentRoutes";
import careerRoutes from "./careerRoutes";
import userRoutes from "./userRoutes";
import authRoutes from "./authRoutes";

const router = Router();

router.use("/api/appointments", appointmentRoutes);
router.use("/api/careers", careerRoutes);
router.use("/api/users", userRoutes);
router.use("/api/auth", authRoutes);

export default router;
