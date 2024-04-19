import express from "express";
import {
  createUser,
  getProfile,
  updateProfile,
  login,
  logout,
} from "../controllers/userController.js";
import { checkToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", createUser);
router.get("/profile", checkToken, getProfile);
router.put("/profile", checkToken, updateProfile);
router.post("/login", login);
router.post("/logout", logout);

export default router;
