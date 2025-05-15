import express from "express";
import {
  cancelOrder,
  getProducts,
  detailProduct,
  deleteProduct,
} from "../controllers/productController.js";
import authUser from "../middleware/authUser.js";
import authAdmin from "../middleware/authAdmin.js";

const productRouter = express.Router();

productRouter.get("/get-products", getProducts);
productRouter.get("/detail-product/:prID", detailProduct);
productRouter.post("/cancel-order", authUser, cancelOrder);
productRouter.post("/delete-product",authAdmin,deleteProduct);
export default productRouter;
