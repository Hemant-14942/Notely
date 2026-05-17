import type { Request, Response } from "express";
import { loginUser, registerUser } from "../services/auth.service.js";
import { sendSuccess } from "../utils/api-response.js";
import type { LoginInput, RegisterInput } from "../validators/auth.validator.js";

export const register = async (
  req: Request<object, object, RegisterInput>,
  res: Response
) => {
  const authResponse = await registerUser(req.body);
  return sendSuccess(res, 201, "User registered successfully", authResponse);
};

export const login = async (req: Request<object, object, LoginInput>, res: Response) => {
  const authResponse = await loginUser(req.body);
  return sendSuccess(res, 200, "Login successful", authResponse);
};
