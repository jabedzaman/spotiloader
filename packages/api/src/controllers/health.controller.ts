import { HealthService } from "~/services/health.service";
import type { Request, Response } from "express";

export class HealthController {
    static async getHealth(req: Request, res: Response) {
        const healthService = new HealthService();
        const data = await healthService.getHealth();
        res.json(data);
    }
    static async pong(req: Request, res: Response) {
        const healthService = new HealthService();
        const data = await healthService.pong();
        res.json(data);
    }
}