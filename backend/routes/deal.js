import express from "express";
import {
  getDeals,
  createDeal,
} from "../controllers/deal.js";

import { authMiddleware } from "../middleware/auth.js";
import { roleMiddleware } from "../middleware/role.js";

const router = express.Router();

router.get("/", authMiddleware, getDeals);

router.post(
  "/",
  authMiddleware,
  roleMiddleware(["admin", "manager", "user"]),
  createDeal
);

export default router;