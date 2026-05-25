import express from "express";
import {
  getProducts,
  createProduct,
} from "../controllers/product.js";

import { authMiddleware } from "../middleware/auth.js";
import { roleMiddleware } from "../middleware/role.js";

const router = express.Router();

router.get("/", authMiddleware, getProducts);

router.post(
  "/",
  authMiddleware,
  roleMiddleware(["admin", "manager"]),
  createProduct
);

export default router;