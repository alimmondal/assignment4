/* eslint-disable no-console */
import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
const app: Application = express();
// import cookie

import { globalErrorHandler } from './app/middleware/globalErrorHandler';

import cookieParser from 'cookie-parser';
import httpStatus from 'http-status';
import routes from './app/routes';
app.use(cors());

//parse request
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// custom routes
app.use('/api/v1', routes);

// default routes for testing
app.get('/', async (req: Request, res: Response) => {
  res.send('Hello World!');
});

//global error handler
app.use(globalErrorHandler);

// Not found routes
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'not found',
    errorMessage: [
      {
        path: req.originalUrl,
        message: 'Api not found',
      },
    ],
  });
  next();
});

export default app;
