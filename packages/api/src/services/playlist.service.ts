import spotifyClient from "~/helpers/spotifyClient";

export class playlistService {
    private uri: string;
    constructor(uri: string) {
        this.uri = uri;
    }
    async getPlaylist(uri: string) {
        const playlist = await spotifyClient.getTracksFromPlaylist(uri);
        return playlist;
    }

    async getPlaylistMetadata(uri: string) {
        const playlist = await spotifyClient.getPlaylist(uri);
        return {
            name: playlist.name,
            totalTracks: playlist.total_tracks,
        }
    }
}