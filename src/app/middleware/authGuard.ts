import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import { config } from "../config";
import { catchAsync } from "../utils/catchAsync";
import { prisma } from "../utils/prisma";
import { IUserRole } from "./../../types/index";

// auth guard middleware
const authGuard = (...roles: IUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    console.log({ token });

    if (!token) {
      return sendJWTErrorResponse(res);
    }

    const decodedToken = jwt.verify(token, config.jwt_secret as Secret);

    if (!decodedToken) {
      return sendJWTErrorResponse(res);
    }
    console.log("decodedToken", decodedToken);

    try {
      const isUserExist = await prisma.user.findUnique({
        where: {
          id: (decodedToken as JwtPayload).id,
        },
      });
      console.log({ isUserExist });

      if (!isUserExist) {
        return sendJWTErrorResponse(res);
      }

      req.user = decodedToken as JwtPayload;

      // check if user role is allowed to access the route
      if (roles.length && !roles.includes(isUserExist.role as IUserRole)) {
        return sendJWTErrorResponse(res);
      }

      next();
    } catch (error: any) {
      if (error.name === "TokenExpiredError") {
        return sendJWTErrorResponse(res);
      } else if (error.name === "JsonWebTokenError") {
        return sendJWTErrorResponse(res);
      } else {
        return sendJWTErrorResponse(res);
      }
    }
  });
};

export default authGuard;

// send jwt error response
export const sendJWTErrorResponse = (res: Response) => {
  return res.status(httpStatus.UNAUTHORIZED).json({
    success: false,
    message: "Unauthorized Access",
    errorDetails: null,
  });
};
