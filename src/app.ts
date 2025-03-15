import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import router from "./routes/routes";

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

app.use(router);

// Global Error Handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error("Error:", err.message);
  res.status(500).json({ message: err.message || "Internal Server Error" });
});

export default app;
