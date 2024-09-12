import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Spotify from 'spotifydl-core';
import { PlaylistCommand } from './playlist.command';

@Injectable()
export class Playlist {
  private CLIENT_ID: string;
  private CLIENT_SECRET: string;
  constructor(private readonly configService: ConfigService) {
    this.CLIENT_ID = this.configService.getOrThrow('spotify.client.id');
    this.CLIENT_SECRET = this.configService.getOrThrow('spotify.client.secret');
  }

  async exceute(command: PlaylistCommand) {
    const { uri } = command;
    const spotify = new Spotify({
      clientId: this.CLIENT_ID,
      clientSecret: this.CLIENT_SECRET,
    });
    return spotify.getTracksFromPlaylist(uri);
  }
}
