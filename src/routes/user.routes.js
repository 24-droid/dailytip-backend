import { Router } from "express";
import {registerUser,loginUser,logoutUser,refreshAccessToken} from "../controllers/user.controller.js";
import verifyJWT from "../middlewares/auth.middleware.js";
const router=Router()
router.route("/signup").post(registerUser)
router.route("/login").post(loginUser)
router.route("/logout").post(verifyJWT,logoutUser) // this helps to use the verifyJWT middleware
router.route("/refresh-token").post(refreshAccessToken)
export default router;