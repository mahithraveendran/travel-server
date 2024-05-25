export interface IGenericReturnError<T> {
  statusCode?: number;
  success: boolean;
  message: string;
  errorDetails: T | T[] | any;
}
