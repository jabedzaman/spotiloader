import { Router } from "express";
import { HealthController } from "~/controllers/health.controller";

const router : Router = Router();

router.get("/", HealthController.getHealth);
router.get("/ping", HealthController.pong);

export default router;