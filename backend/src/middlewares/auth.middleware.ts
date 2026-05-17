import type { RequestHandler } from "express";
import jwt, { type JwtPayload, type Secret } from "jsonwebtoken";
import { env } from "../config/env.js";
import { User } from "../models/user.model.js";
import { AppError } from "../utils/app-error.js";

type AuthTokenPayload = JwtPayload & {
  sub?: string;
};

export const authenticate: RequestHandler = async (req, _res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader?.startsWith("Bearer ")) {
      throw new AppError("Unauthorized", 401);
    }

    const token = authorizationHeader.split(" ")[1];
    const decoded = jwt.verify(token, env.jwtSecret as Secret);

    if (typeof decoded === "string" || !(decoded as AuthTokenPayload).sub) {
      throw new AppError("Unauthorized", 401);
    }

    const user = await User.findById((decoded as AuthTokenPayload).sub).select("_id");

    if (!user) {
      throw new AppError("Unauthorized", 401);
    }

    req.userId = String(user._id);
    return next();
  } catch (error) {
    if (error instanceof AppError) {
      return next(error);
    }

    return next(new AppError("Unauthorized", 401));
  }
};
