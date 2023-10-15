import type { Request, Response } from 'express';
import { playlistService } from '~/services/playlist.service';

export class playlistController {
    static async getPlaylist(req: Request, res: Response) {
        const { uri, metadataOnly } = req.query;
        if (metadataOnly === 'true') {
            const playlist = new playlistService(uri as string);
            const data = await playlist.getPlaylistMetadata(uri as string);
            res.json(data);
        } else {
            const playlist = new playlistService(uri as string);
            const data = await playlist.getPlaylist(uri as string);
            res.json(data);
        }
    }
}