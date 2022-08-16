import mongoose from 'mongoose';
import dotenv from 'dotenv';

import { DATABASE } from '~/config';

dotenv.config();

const PORT = process.env.DATABASE || DATABASE;

const ConnectDB = async (): Promise<void> => {
  try {
    const con = await mongoose.connect(`mongodb://127.0.0.1:27017/${PORT}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
    console.warn(
      `⚡️[Database connected]: Database connected ${con.connection.host}`
    );
  } catch (e) {
    if (e instanceof Error) {
      console.error(`Error: ${e.message}`);
      process.exit(1);
    } else {
      throw e;
    }
  }
};

export default ConnectDB;
