import type { Request, Response } from 'express';
import { trackService } from '~/services/track.service';

export class trackController {
    public static async getTrack(req: Request, res: Response) {
        const { uri, id } = req.query;
        if (uri && id) {
            return res.status(400).json({ message: "You can't use both uri and id" });
        } else if (uri) {
            const track = await new trackService(uri.toString()).getTrack();
            return res.status(200).json(track);
        } else if (id) {
            const track = await new trackService(id.toString()).getTrackById();
            return res.status(200).json(track);
        } else if (!uri && !id) {
            return res.status(400).json({ message: "You must provide either uri or id" });
        } else {
            return res.status(500).json({ message: "Something went wrong" });
        }
    }
}