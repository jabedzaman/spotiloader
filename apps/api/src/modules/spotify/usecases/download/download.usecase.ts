import { HttpException, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Spotify from 'spotifydl-core';
import SpotifyFetcher from 'spotifydl-core/dist/Spotify';
import { DownloadCommand } from './download.command';
import * as fs from 'node:fs';

@Injectable()
export class Download {
  private spotify: SpotifyFetcher;
  private readonly logger = new Logger(Download.name);
  constructor(private readonly configService: ConfigService) {
    this.spotify = new Spotify({
      clientId: this.configService.getOrThrow('spotify.client.id'),
      clientSecret: this.configService.getOrThrow('spotify.client.secret'),
    });
  }

  async execute(command: DownloadCommand) {
    const { uri } = command;
    try {
      const track = await this.spotify.getTrack(uri);
      this.logger.log(
        `Downloading: ${track.name} by: ${track.artists.join(' ')}`,
      );
      const song = await this.spotify.downloadTrack(uri);
      fs.writeFileSync('~/Developer/song.mp3', song);
      const buffer = Buffer.from(song);
      return buffer;
    } catch (error: any) {
      this.logger.error(error);
      throw new HttpException(error.message, 500);
    }
  }
}
