import { Router } from "express";
import { trackController } from "~/controllers/track.controller";

const router: Router = Router();

router.get("/", trackController.getTrack);

export default router;