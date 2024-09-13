import { setupSwagger } from '@/swagger';
import { AppModule } from '@app/app.module';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Response } from 'express';
import "dotenv/config";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });
  const configService = app.get(ConfigService);
  const app_name: string = configService.getOrThrow<string>('app.name');
  const port: number = configService.getOrThrow<number>('app.http.port');
  const host: string = configService.getOrThrow<string>('app.http.host');
  const globalPrefix: string =
    configService.getOrThrow<string>('app.globalPrefix');
  const versioningPrefix: string = configService.getOrThrow<string>(
    'app.versioning.prefix',
  );
  const version: string = configService.getOrThrow<string>(
    'app.versioning.version',
  );
  const versionEnable: string = configService.getOrThrow<string>(
    'app.versioning.enable',
  );
  const logger = new Logger(app_name);
  app.getHttpAdapter().getInstance().set('json spaces', 4);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      forbidUnknownValues: false,
    }),
  );
  app.setGlobalPrefix(globalPrefix);
  app.useStaticAssets('public');
  if (versionEnable) {
    app.enableVersioning({
      type: VersioningType.URI,
      defaultVersion: version,
      prefix: versioningPrefix,
    });
  }
  if (configService.getOrThrow<string>('app.env') === 'development') {
    setupSwagger(app);
  }
  app.getHttpAdapter().get('/', (_, res: Response) => {
    res.redirect('/api/health');
  });
  await app.listen(port, () => {
    logger.log(
      `🚀 ${configService.getOrThrow<string>('app.name').toLocaleUpperCase()} is running on ${host}:${port}`,
    );
  });
}
bootstrap();
