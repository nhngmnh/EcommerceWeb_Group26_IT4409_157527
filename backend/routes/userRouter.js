import express from "express";
import {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  verifyChangePassword,
  forgotPassword,
  verify,
  deleteUser,
} from "../controllers/userController.js";
import authUser from "../middleware/authUser.js";
import upload from "../middleware/multer.js";
import {
  askGroq,
  getConversation,
  handleChat,
  handleDeleteChatHistory,
} from "../controllers/chatbotController.js";
import {getAllReplies, getReplyByUser} from "../controllers/replyController.js";
import { callback, payCart } from "../controllers/paymentController.js";
import { getNotificationsByUser, markAllAsRead, markOneAsRead } from "../controllers/notificationController.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/f")
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
userRouter.get("/get-all-replies", authUser, getAllReplies);
userRouter.post("/pay-cart", authUser, payCart);
userRouter.get("/get-my-replies", authUser, getReplyByUser );
userRouter.get("/get-all-replies", authUser, getAllReplies); 
userRouter.get("/get-notifications", authUser, getNotificationsByUser);
userRouter.post("/mark-one-as-read", authUser, markOneAsRead);
userRouter.post("/mark-all-as-read", authUser, markAllAsRead);
userRouter.get('/verify',verify)
userRouter.post('/forgot-password',forgotPassword)
userRouter.post('/verify-change-password',verifyChangePassword);
userRouter.post('/delete-user',authUser,deleteUser)
userRouter.post('/callback',callback)
export default userRouter;
