import express from "express";
import {
  cancelOrder,
  getProducts,
  detailProduct,
} from "../controllers/productController.js";
import authUser from "../middleware/authUser.js";

const productRouter = express.Router();

productRouter.get("/get-products", getProducts);
productRouter.get("/detail-product/:prID", detailProduct);
productRouter.post("/cancel-order", authUser, cancelOrder);

export default productRouter;
