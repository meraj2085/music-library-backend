import { Server } from 'http';
import app from './app';
import config from './config';
import { Client } from 'pg';

const DB = new Client({
  host: 'localhost',
  user: 'postgres',
  port: 5432,
  password: 'meraj123',
  database: 'M360ICT',
});

async function bootstrap() {
  await DB.connect();

  const server: Server = app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
  });

  const exitHandler = () => {
    if (server) {
      server.close(() => {
        console.log('Server closed');
      });
    }
    process.exit(1);
  };

  const unexpectedErrorHandler = (error: unknown) => {
    console.error(error);
    exitHandler();
  };

  process.on('uncaughtException', unexpectedErrorHandler);
  process.on('unhandledRejection', unexpectedErrorHandler);
}

bootstrap();

export default DB;
