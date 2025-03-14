import { Request, Response } from "express";
import { Career } from "../models/Career";

export const getCareers = async (_req: Request, res: Response) => {
  const careers = await Career.findAll();
  res.json(careers);
};

export const createCareer = async (req: Request, res: Response) => {
  const career = await Career.create(req.body);
  res.status(201).json(career);
};
