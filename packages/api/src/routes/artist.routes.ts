import { Router } from "express";
import { artistController } from "~/controllers/artist.controller";

const router: Router = Router();

router.get('/', artistController.getArtist);
router.get('/albums', artistController.getArtistAlbums);

export default router;