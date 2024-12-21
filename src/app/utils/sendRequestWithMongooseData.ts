import { Response } from 'express';

type TResponseWithData = {
  success: boolean;
  message?: string;
  statusCode: number;
};

const sendRequestData = (res: Response, data: TResponseWithData) => {
  res.status(data.statusCode).json({
    success: data.success,
    message: data.message,
    statusCode: data.statusCode,
  });
};

export default sendRequestData;
