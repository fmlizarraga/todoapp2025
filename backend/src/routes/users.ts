import { Router } from "express";
import { getOneUser, createOneUser, refreshToken } from "../controllers";
import { isAuth } from "../middleware/isAuth";

const router = Router();

router.get("/", isAuth, refreshToken);
router.post("/", getOneUser);
router.post("/register", createOneUser);

export default router;
