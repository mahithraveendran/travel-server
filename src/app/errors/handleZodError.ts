/* eslint-disable @typescript-eslint/no-explicit-any */
import { ZodError } from "zod";
import { IGenericReturnError } from "../interfaces/error";

// define handle zod error function
const handleZodError = (
  error: ZodError
): IGenericReturnError<ZodError<any>> => {
  // generate error message
  const errorMessage = error.issues
    .map((issue) => `${issue.message}`)
    .join(". ");

  return {
    success: false,
    message: errorMessage,
    errorDetails: {
      issues: error.issues.map((issue) => ({
        message: issue.message,
        field: issue.path[issue.path.length - 1],
      })),
    },
  };
};

export default handleZodError;
