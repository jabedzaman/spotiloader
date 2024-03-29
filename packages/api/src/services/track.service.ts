import spotifyClient from "~/helpers/spotifyClient";

export class trackService {
    private uri: string;
    constructor(uri: string) {
        this.uri = uri;
    }
    public async getTrack() {
        const track = await spotifyClient.getTrack(this.uri);
        return track
    }

    public async getTrackById() {
        const track = await spotifyClient.getTrack(this.uri);
        return track;
    }
}