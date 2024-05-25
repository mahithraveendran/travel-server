import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import { config } from "../config";
import { catchAsync } from "../utils/catchAsync";
import { prisma } from "../utils/prisma";

const authGuard = () => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

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

      if (!isUserExist) {
        return sendJWTErrorResponse(res);
      }

      req.user = decodedToken as JwtPayload;

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
