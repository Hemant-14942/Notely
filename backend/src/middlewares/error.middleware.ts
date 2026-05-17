import type { ErrorRequestHandler, RequestHandler } from "express";
import { AppError } from "../utils/app-error.js";

export const routeNotFoundHandler: RequestHandler = (req, _res, next) => {
  next(new AppError(`Route not found: ${req.originalUrl}`, 404));
};

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  const statusCode = err instanceof AppError ? err.statusCode : 500;

  return res.status(statusCode).json({
    success: false,
    message: err.message || "Internal server error"
  });
};
