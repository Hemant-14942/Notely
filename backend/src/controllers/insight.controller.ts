import type { Request, Response } from "express";
import { getUserInsights as getUserInsightsService } from "../services/insight.service.js";
import { sendSuccess } from "../utils/api-response.js";
import { AppError } from "../utils/app-error.js";

const getAuthenticatedUserId = (req: Request): string => {
  if (!req.userId) {
    throw new AppError("Unauthorized", 401);
  }

  return req.userId;
};

export const getUserInsights = async (req: Request, res: Response) => {
  const insights = await getUserInsightsService(getAuthenticatedUserId(req));
  return sendSuccess(res, 200, "Insights fetched successfully", insights);
};
