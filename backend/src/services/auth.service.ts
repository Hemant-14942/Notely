import jwt, { type Secret, type SignOptions } from "jsonwebtoken";
import { env } from "../config/env.js";
import { User, type UserDocument } from "../models/user.model.js";
import { AppError } from "../utils/app-error.js";
import type { LoginInput, RegisterInput } from "../validators/auth.validator.js";

type AuthUser = {
  id: string;
  name: string;
  email: string;
};

type AuthResponse = {
  user: AuthUser;
  token: string;
};

const sanitizeUser = (user: UserDocument): AuthUser => ({
  id: String(user._id),
  name: user.name,
  email: user.email
});

const signToken = (userId: string): string => {
  const options: SignOptions = {
    expiresIn: env.jwtExpiresIn as SignOptions["expiresIn"]
  };

  return jwt.sign({ sub: userId }, env.jwtSecret as Secret, options);
};

export const registerUser = async (payload: RegisterInput): Promise<AuthResponse> => {
  const existingUser = await User.findOne({ email: payload.email });

  if (existingUser) {
    throw new AppError("Email is already registered", 409);
  }

  const user = await User.create(payload);

  return {
    user: sanitizeUser(user),
    token: signToken(String(user._id))
  };
};

export const loginUser = async (payload: LoginInput): Promise<AuthResponse> => {
  const user = await User.findOne({ email: payload.email }).select("+password");

  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }

  const isPasswordValid = await user.comparePassword(payload.password);

  if (!isPasswordValid) {
    throw new AppError("Invalid email or password", 401);
  }

  return {
    user: sanitizeUser(user),
    token: signToken(String(user._id))
  };
};
