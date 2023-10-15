import type { Request, Response } from "express";
import { artistService } from "~/services/artist.service";

export class artistController {
    static async getArtist(req: Request, res: Response) {
        const { uri } = req.query;
        const artist = new artistService(uri as string);
        const data = await artist.getArtist(uri as string);
        res.json(data);
    }

    static async getArtistAlbums(req: Request, res: Response) {
        const { uri } = req.query;
        const artist = new artistService(uri as string);
        const data = await artist.getArtistAlbums(uri as string);
        res.json(data);
    }
}