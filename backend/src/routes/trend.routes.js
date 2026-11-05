import express from "express";

import {
  collectTrends,
  getTrends,
} from "../controllers/trend.controller.js";

const router = express.Router();

router.post("/collect", collectTrends);
router.get("/", getTrends);

export default router;