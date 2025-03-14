import { Router } from 'express';
import appointmentRoutes from './appointmentRoutes';
import careerRoutes from './careerRoutes';
import userRoutes from './userRoutes';


const router = Router();

router.use('/api/appointments', appointmentRoutes);
router.use('/api/careers', careerRoutes);
router.use('/api/users', userRoutes);

export default router;