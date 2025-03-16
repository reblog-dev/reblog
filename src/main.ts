import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Logger } from "@innei/pretty-logger-nestjs";
import { logger } from "./utils/logger.utils";
import { AnyExceptionFilter } from "./common/filters/any-exception.filter";
import { ValidationPipe } from "@nestjs/common";
import { appConfig } from "./app.config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  Logger.setLoggerInstance(logger);
  app.useLogger(app.get(Logger));

  app.useGlobalFilters(new AnyExceptionFilter());

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  await app.listen(appConfig.server.port, appConfig.server.host, async () => {
    const url = await app.getUrl();

    logger.info(`reblog 正运行于 ${url}`);
  });
}

bootstrap().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
