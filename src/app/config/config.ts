import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export const config = {
  port: process.env.PORT || 4000,
  NODE_ENV: process.env.NODE_ENV || "development",
  salt_round: process.env.SALT_ROUND || 10,
  jwt_secret: process.env.JWT_SECRET,
  expiresIn: process.env.JWT_EXPIRES_IN || "1d",
};
