import express from "express"
import { signup,signin,signout } from "../controller/auth.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/signup",signup);
router.post("/login",signin);
router.get("/logout",verifyToken,signout);

export default router