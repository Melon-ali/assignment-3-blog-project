import mongoose from 'mongoose';
import { TErrorSources, TGenericErrorResponse } from '../interface/error';
import { StatusCodes } from 'http-status-codes';

const handleCastError = (
  err: mongoose.Error.CastError,
): TGenericErrorResponse => {
  const errorSources: TErrorSources = [
    {
      path: err.path,
      message: err.message,
    },
  ];

  const statusCode = StatusCodes.NOT_FOUND;

  return {
    statusCode,
    message: 'Not Found',
    errorSources,
  };
};

export default handleCastError;