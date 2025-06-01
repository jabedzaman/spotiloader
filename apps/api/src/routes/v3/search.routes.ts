import { Router } from "express";
import { searchController } from "~/controllers";
import { validate } from "~/middlewares";
import { createSearchSchema } from "~/validators";

const router: Router = Router();

// list all searches
router.get("/", searchController.list);

// create a new search
router.post("/", validate(createSearchSchema), searchController.create);

export { router as searchRoutes };
