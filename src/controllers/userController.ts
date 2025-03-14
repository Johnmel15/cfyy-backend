import { Request, Response } from "express";
import { User } from "../models/User";

export const getUsers = async (_req: Request, res: Response) => {
  const users = await User.findAll();
  res.json(users);
};

export const createUser = async (req: Request, res: Response) => {
  const user = await User.create(req.body);
  res.status(201).json(user);
};
