import express from "express";
import {
  getCustomers,
  createCustomer,
} from "../controllers/customer.js";

import { authMiddleware } from "../middleware/auth.js";
import { roleMiddleware } from "../middleware/role.js";

const router = express.Router();

router.get("/", authMiddleware, getCustomers);

// admin + manager only
router.post(
  "/",
  authMiddleware,
  roleMiddleware(["admin", "manager"]),
  createCustomer
);

export default router;