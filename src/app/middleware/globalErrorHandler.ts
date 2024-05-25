import { ErrorRequestHandler } from "express";
import handleZodError from "../errors/handleZodError";
import { IGenericReturnError } from "../interfaces/error";

const simplifiedError = (err: any): IGenericReturnError<any> => {
  let success = false;
  let message = err.message || "Internal server error";
  let errorDetails = err.errorDetails || err;
  let statusCode = err.statusCode || 500;

  if (err?.name === "ZodError") {
    return handleZodError(err);
  }

  return { success, message, errorDetails, statusCode };
};

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.log({ err });
  // simplified error
  const { success, message, errorDetails, statusCode } = simplifiedError(err);

  res.status(statusCode || 500).json({
    success: success,
    message: message,
    errorDetails,
    error: err,
  });
};

export default globalErrorHandler;
