/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { ErrorRequestHandler } from 'express';
import { ZodError, ZodIssue } from 'zod';
import { TErrorSources } from '../interface/error';
import config from '../config';
import handleValidationError from '../errors/handleValidationError';
import handleCastError from '../errors/handleCastError';
import handleDuplicateError from '../errors/handleDuplicateError';
import AppError from '../errors/AppError';
import handleZodError from '../errors/handleZodError';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = 500;
  let message = 'Something went wrong!';
  let errorSources:
    | { path: string; message: string }
    | { details: TErrorSources } = {
    path: '',
    message: 'Something went wrong!',
  };

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = { details: simplifiedError.errorSources };
  } else if (err?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = {
      path: '',
      message: simplifiedError.message,
    };
  } else if (err?.name === 'CastError') {
    const simplifiedError = handleCastError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = {
      path: '',
      message: simplifiedError.message,
    };
  } else if (err?.code === 11000) {
    const simplifiedError = handleDuplicateError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = {
      path: '',
      message: simplifiedError.message,
    };
  } else if (err instanceof AppError) {
    statusCode = err?.statusCode;
    message = err?.message;
    errorSources = {
      path: '',
      message: err.message,
    };
  } else if (err instanceof Error) {
    message = err?.message;
    errorSources = {
      path: '',
      message: err.message,
    };
  }

  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
    error: errorSources,
    stack: err?.stack,
  });
};

export default globalErrorHandler;
