import type { Request, Response } from 'express';
import { trackService } from '~/services/track.service';

export class trackController {
    public static async getTrack(req: Request, res: Response) {
        const { uri } = req.query;
        const track = new trackService(uri as string);
        const data = await track.getTrack();
        res.json(data);
    }
}