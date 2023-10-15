import type { Request, Response } from 'express';
import { albumService } from '~/services/album.service';

export class albumController {
    static async getAlbum(req: Request, res: Response) {
        const { uri, metadataOnly } = req.query;
        if (metadataOnly === 'true') {
            const album = new albumService(uri as string);
            const metadata = await album.getAlbumMetadata(uri as string);
            return res.status(200).json(metadata);
        } else {
            const album = new albumService(uri as string);
            const tracks = await album.getAlbum(uri as string);
            return res.status(200).json(tracks);
        }
    }
}