import { Router } from "express";
import { playlistController } from "~/controllers/playlist.controller";

const router: Router = Router();

router.get("/", playlistController.getPlaylist);

export default router;