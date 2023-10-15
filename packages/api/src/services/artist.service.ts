import spotifyClient from "~/helpers/spotifyClient";

export class artistService {
    private uri: string;
    constructor(uri: string) {
        this.uri = uri;
    }

    async getArtist(uri: string) {
        const artist = await spotifyClient.getArtist(uri);
        return artist;
    }

    async getArtistAlbums(uri: string) {
        const data = await spotifyClient.getArtistAlbums(uri);
        return data;
    }
}