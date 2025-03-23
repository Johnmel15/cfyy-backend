import { Request, Response } from "express";
import Appointment from "../models/Appointment";

const AppointmentController = {
  getAppointments: async (_req: Request, res: Response) => {
    const appointments = await Appointment.findAll();
    res.json(appointments);
  },

  createAppointment: async (req: Request, res: Response) => {
    const appointment = await Appointment.create(req.body);
    res.status(201).json(appointment);
  },
};

export default AppointmentController; // Default export
