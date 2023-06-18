import { NestFactory } from '@nestjs/core';
import { PomodoroApi } from './pomodoro-api';
import { Logger } from '@shared/logger';

const PORT = process.env.PORT || 1337;

async function bootstrap() {
  const app = await NestFactory.create(PomodoroApi, {
    logger: new Logger(),
  });
  await app.listen(PORT);
}
bootstrap()
  .then(() => {
    console.log(`Your api is running at http://localhost:${PORT}`);
  })
  .catch((error) => {
    console.error(error);
  });
