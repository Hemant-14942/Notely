import dotenv from "dotenv";

dotenv.config();

type Env = {
  nodeEnv: string;
  port: number;
  apiPrefix: string;
  clientUrl: string;
  mongoUri: string;
  jwtSecret: string;
  jwtExpiresIn: string;
  llmApiKey: string;
};

const requiredEnv = (key: string, fallback?: string): string => {
  const value = process.env[key] ?? fallback;

  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }

  return value;
};

const normalizeOrigin = (url: string): string => url.replace(/\/$/, "");

export const env: Env = {
  nodeEnv: requiredEnv("NODE_ENV", "development"),
  port: Number(process.env.PORT ?? 5000),
  apiPrefix: requiredEnv("API_PREFIX", "/api/v1"),
  clientUrl: normalizeOrigin(requiredEnv("CLIENT_URL", "http://localhost:3000")),
  mongoUri: requiredEnv("MONGODB_URI"),
  jwtSecret: requiredEnv("JWT_SECRET", "change-this-secret-before-production"),
  jwtExpiresIn: requiredEnv("JWT_EXPIRES_IN", "7d"),
  llmApiKey: requiredEnv("LLM_API_KEY")
};
