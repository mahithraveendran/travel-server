import { Response } from "express";

export interface IResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  meta?: {
    page: number;
    limit: number;
    total: number;
  };
  data: T;
}

export const sendResponse = <T>(res: Response, payload: IResponse<T>) => {
  return res.status(payload.statusCode).json({
    success: payload.success,
    statusCode: payload.statusCode,
    message: payload.message,
    meta: payload.meta,
    data: payload.data,
  });
};
