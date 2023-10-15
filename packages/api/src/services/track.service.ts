import spotifyClient from "~/helpers/spotifyClient";

export class trackService {
    public uri: string;
    constructor(uri: string) {
        this.uri = uri;
    }
    public async getTrack() {
        const track = await spotifyClient.getTrack(this.uri);
        return track;
    }
}