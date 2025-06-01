import { Router } from "express";
import { searchRoutes } from "./search.routes";

const router: Router = Router();

router.use("/searches", searchRoutes);

export { router as v3Routes };
