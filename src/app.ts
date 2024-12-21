import express, { Application, Request, Response } from 'express';
import cors from 'cors';
const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

// application routes

// app.use('/api/products', ProductRoutes);

// app.use('/api/orders', orderRoutes);

app.get('/', (req: Request, res: Response) => {
  res.json({
    status: true,
    message: 'Server Live',
  });
});

export default app;
