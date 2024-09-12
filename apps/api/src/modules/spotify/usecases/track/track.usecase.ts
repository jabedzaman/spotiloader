import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Spotify from 'spotifydl-core';
import { TrackCommand } from './track.command';

@Injectable()
export class Track {
  private CLIENT_ID: string;
  private CLIENT_SECRET: string;
  constructor(private readonly configService: ConfigService) {
    this.CLIENT_ID = this.configService.getOrThrow('spotify.client.id');
    this.CLIENT_SECRET = this.configService.getOrThrow('spotify.client.secret');
  }

  async exceute(command: TrackCommand) {
    const { uri } = command;
    const spotify = new Spotify({
      clientId: this.CLIENT_ID,
      clientSecret: this.CLIENT_SECRET,
    });
    return spotify.getTrack(uri);
  }
}
