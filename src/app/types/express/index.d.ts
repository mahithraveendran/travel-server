import { JwtPayload } from "jsonwebtoken";
import { IUser } from "../../middleware/jwtUser";

declare global {
  namespace Express {
    export interface Request {
      user?: (IUser | JwtPayload) | undefined;
    }
  }
}
