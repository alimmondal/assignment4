/* eslint-disable no-console */
import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import config from './config';
// import { errorLogger as console } from './shared/logger';

process.on('uncaughtException', error => {
  console.log('uncaughtException is detected', error);
  process.exit(1);
});

let server: Server;

async function main() {
  try {
    // await mongoose.connect(config.local_database_url as string);
    await mongoose.connect(config.database_url as string);
    console.log('Database connected successfully');
    server = app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (error) {
    console.log('database connection failed', error);
  }
  process.on('unhandledRejection', error => {
    if (server) {
      server.close(() => {
        console.log(error);
      });
    } else {
      process.exit(1);
    }
  });
}

main();

// console.log(x)

process.on('SIGTERM', () => {
  console.log('SIGTERM is received');
  if (server) {
    server.close();
  }
});
