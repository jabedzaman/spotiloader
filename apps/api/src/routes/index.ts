import { Router } from "express";
import { v3Routes } from "./v3";

export const router: Router = Router();

router.use("/v3", v3Routes);

router.get("/", (req, res) => {
  res.json({ success: true });
});
