import { registerAs } from '@nestjs/config';

type SpotifyConfig = {
  client: {
    id: string;
    secret: string;
  };
};

export default registerAs(
  'spotify',
  (): Required<SpotifyConfig> => ({
    client: {
      id: process.env.SPOTIFY_CLIENT_ID,
      secret: process.env.SPOTIFY_CLIENT_SECRET,
    },
  }),
);
