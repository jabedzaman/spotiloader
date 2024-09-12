import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Playlist, PlaylistCommand } from './usecases/playlist';
import { Track, TrackCommand } from './usecases/track';

@ApiTags('spotify')
@Controller({
  path: '/spotify',
  version: '1',
})
export class SpotifyController {
  constructor(
    private readonly trackUseCase: Track,
    private readonly playlistUseCase: Playlist,
  ) {}

  @ApiOperation({
    summary: 'Get tracks from Spotify',
    description: 'Get tracks metadata from Spotify',
  })
  @ApiQuery({
    name: 'uri',
    required: true,
    type: String,
    description: 'Spotify track uri',
    example:
      'https://open.spotify.com/track/7CyPwkp0oE8Ro9Dd5CUDjW?si=UkXWlddjR5e6cD4uansplw',
  })
  @Get('/track')
  tracks(@Query('uri') uri: string) {
    return this.trackUseCase.exceute(
      TrackCommand.create({
        uri,
      }),
    );
  }

  @ApiOperation({
    summary: 'Get playlist from Spotify',
    description: 'Get playlist metadata from Spotify',
  })
  @ApiQuery({
    name: 'uri',
    required: true,
    type: String,
    description: 'Spotify playlist uri',
    example:
      'https://open.spotify.com/playlist/36TVZREmfIerWw2rmcOdTL?si=wpIuA1qERC--PofGdFYY_g',
  })
  @Get('/playlist')
  playlist(@Query('uri') uri: string) {
    return this.playlistUseCase.exceute(
      PlaylistCommand.create({
        uri,
      }),
    );
  }
}
