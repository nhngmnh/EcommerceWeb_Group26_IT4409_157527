import express from "express";
import {
  removeCart,
  getCarts,
  changeStatus,
  listCart,
  cancelOrder,
  createCart,
} from "../controllers/cartController.js";
import authUser from "../middleware/authUser.js";

const cartRouter = express.Router();
 
cartRouter.post("/create-cart", authUser, createCart);
cartRouter.get("/list-mycart", authUser, listCart);
cartRouter.post("/cancel-order", authUser, cancelOrder);
cartRouter.post("/remove-cart/:cartId", authUser, removeCart);
cartRouter.post("/change-status", authUser, changeStatus);

export default cartRouter;
