import { Spotify } from "spotifydl-core"
import { config } from "~/config"

const spotifyClient = new Spotify({
    clientId: config.SPOTIFY_CLIENT_ID,
    clientSecret: config.SPOTIFY_CLIENT_SECRET
})

export default spotifyClient