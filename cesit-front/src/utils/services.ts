import { AxiosError } from 'axios';

export class CustomError extends Error {
  constructor(public code: number, public message: string) {
    super(message);
  }
}

export const manageError = (error: unknown): CustomError => {
  if (error instanceof AxiosError) {
    return new CustomError(
      error?.response?.data?.statusCode || 400,
      error?.response?.data?.message || error.message
    );
  } else {
    return new CustomError(500, 'Error desconocido');
  }
};
