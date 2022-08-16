import 'module-alias/register';
import express, { RequestHandler } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import ConnectDB from '~/db';

import DailyRouter from '~/routes/daily-router';
import UserRouter from '~/routes/user-router';

const app = express();

ConnectDB() as unknown;

dotenv.config();

const PORT = process.env.PORT || 6900;

app.use(cors());
app.use(express.json() as RequestHandler);
app.use(express.urlencoded({ extended: true }) as RequestHandler);

app.use('/api/', DailyRouter);
app.use('/user-api/', UserRouter);

const server = app.listen(PORT, () => {
  console.warn(
    `⚡️[server]: Server is running in ${
      process.env.NODE_ENV as string
    } at http://localhost:${PORT}`
  );
});

export default server;
