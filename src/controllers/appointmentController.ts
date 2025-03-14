import { Request, Response } from "express";
import { Appointment } from "../models/Appointment";

export const getAppointments = async (_req: Request, res: Response) => {
  const appointments = await Appointment.findAll();
  res.json(appointments);
};

export const createAppointment = async (req: Request, res: Response) => {
  const appointment = await Appointment.create(req.body);
  res.status(201).json(appointment);
};
