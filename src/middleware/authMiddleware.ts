import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models"; // Adjust the import based on your structure

const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Assuming Bearer token

  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  let decoded: jwt.JwtPayload | string;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET!); // Use your secret
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  // Type guard to check if decoded is a JwtPayload
  if (typeof decoded === "string" || !decoded.id) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const userId = decoded.id; // Now TypeScript knows userId is a number

  // Fetch user from the database
  const user = await User.findByPk(userId);

  if (!user) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  // req.user = user; // Attach user to request object
  next(); // Call next() to pass control to the next middleware or route handler
};

export default authenticate;
