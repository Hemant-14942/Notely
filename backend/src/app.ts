import cookieParser from "cookie-parser";
import cors from "cors";
import express, { type Request, type Response } from "express";
import helmet from "helmet";
import morgan from "morgan";
import { env } from "./config/env.js";
import { errorHandler, routeNotFoundHandler } from "./middlewares/error.middleware.js";
import routes from "./routes/index.js";

export const app = express();

app.use(helmet());
app.use(
  cors({
    origin: env.clientUrl,
    credentials: true
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan(env.nodeEnv === "production" ? "combined" : "dev"));

app.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Backend is running"
  });
});

app.use(env.apiPrefix, routes);
app.use(routeNotFoundHandler);
app.use(errorHandler);
