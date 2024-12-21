import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import router from './app/routes';
const app: Application = express();

// parser
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// application routes

app.use('/api', router);


app.get('/', (req: Request, res: Response) => {
  res.json({
    status: true,
    message: 'Server Live',
  });
});

export default app;
