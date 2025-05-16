import express from "express";
import {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
} from "../controllers/userController.js";
import authUser from "../middleware/authUser.js";
import upload from "../middleware/multer.js";
import {
  askGroq,
  getConversation,
  handleChat,
  handleDeleteChatHistory,
} from "../controllers/chatbotController.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/get-profile", authUser, getProfile);
userRouter.post(
  "/update-profile",
  upload.single("image"),
  authUser,
  updateProfile
);
userRouter.post("/ask-groq", askGroq);
userRouter.post("/ask-and-save-groq", authUser, handleChat);
userRouter.post("/delete-conversation", authUser, handleDeleteChatHistory);
userRouter.get("/get-conversation", authUser, getConversation);

export default userRouter;
