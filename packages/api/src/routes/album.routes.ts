import { Router } from "express";
import { albumController } from "~/controllers/album.controller";

const router: Router = Router();

router.get('/', albumController.getAlbum);

export default router;