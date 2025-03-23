import { JwtPayload } from "jsonwebtoken";
import { User } from "../models"; // Adjust the import based on your structure

declare module "express-serve-static-core" {
  interface Request {
    user?: User; // Attach user to request
  }
}

declare global {
  namespace Express {
    interface Request {
      user?: User; // Make user optional
    }
  }
}
