import spotifyClient from "~/helpers/spotifyClient";

export class albumService {
    private uri: string;
    constructor(uri: string) {
        this.uri = uri;
    }

    async getAlbum(uri: string) {
        const album = await spotifyClient.getTracksFromAlbum(uri);
        return album;
    }

    public async getAlbumMetadata(uri: string) {
        const album = await spotifyClient.getAlbum(uri);
        return {
            name: album.name,
            totalTracks: album.total_tracks,
        }
    }
}