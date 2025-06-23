import express from "express";
import { validateLoginUser, validateRegisterUser } from "../middleware/validator.js";
import { loginUser, logoutUser, registerUser } from "../controllers/userController.js";
import { auth } from "../middleware/auth.js";
import ApiResponse from "../utils/ApiResponse.js";

const userRouter = express.Router();

userRouter.route("/register").post(validateRegisterUser, registerUser);
userRouter.route("/login").post(validateLoginUser, loginUser);
userRouter.route("/logout").delete(auth, logoutUser);

userRouter.route("/profile").get(auth, (req, res) => {
    res.status(200).json(new ApiResponse(req.user, "User profile fetched"));
});

export { userRouter };