import { Module } from '@nestjs/common';
import { SpotifyController } from './spotify.controller';
import { USE_CASES } from './usecases';

@Module({
  exports: [...USE_CASES],
  providers: [...USE_CASES],
  controllers: [SpotifyController],
})
export class SpotifyModule {}
