import cartModel from "../models/cartModel.js";
import productModel from "../models/productModel.js";
import userModel from "../models/userModel.js";

const removeCart = async (req, res) => {
  try {
    const { cartId } = req.params; // Lấy cartId từ params, hoặc userId

    // Kiểm tra nếu không có cartId hoặc userId
    if (!cartId) {
      return res.status(400).json({ message: "cartId is required" });
    }

    let cart;
    // Xóa giỏ hàng theo cartId nếu có
    if (cartId) {
      cart = await cartModel.findByIdAndDelete(cartId);
    }
    return res.json({ message: "Giỏ hàng đã được xóa thành công", cart });
  } catch (error) {
    console.error("Lỗi khi xóa giỏ hàng:", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};
const getCarts = async (req, res) => {
  try {
    const carts = await cartModel.find({});

    // Kiểm tra nếu không có giỏ hàng
    if (carts.length === 0) {
      return res.status(204).json({ success: true, message: "No carts found" });
    }
    return res.status(200).json({ success: true, carts });
  } catch (error) {
    console.error("Cannot get carts", error);
    return res.status(500).json({ message: "Server Error" });
  }
};
const changeStatus = async (req, res) => {
  try {
    const { cartId, status } = req.body;
    if (!status)
      return res
        .status(404)
        .json({ success: false, message: "Cannot get status" });
    await cartModel.findByIdAndUpdate(cartId, { status }, { new: true });
    return res.status(200).json({
      success: true,
      message: `Change status to ${status} successfully`,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

const listCart = async (req, res) => {
  try {
    const { userId } = req.body;
    const carts = await cartModel.find({ userId });
    res.json({ success: true, cartData: carts });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const cancelOrder = async (req, res) => {
  try {
    const { orderId } = req.body;
    const order = await cartModel.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    if (["shipped", "cancelled"].includes(order.status)) {
      return res.status(400).json({
        message: "Cannot cancel an order that is already shipped or cancelled",
      });
    }
    const product = await productModel.findById(order.itemId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    await Promise.all([
      cartModel.findByIdAndUpdate(
        orderId,
        { status: "cancelled" },
        { new: true }
      ),
      productModel.findByIdAndUpdate(order.itemId, {
        $inc: { stock_quantity: order.totalItems },
      }),
    ]);
    return res.status(200).json({ message: "Order cancelled successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const createCart = async (req, res) => {
  try {
    const { userId, itemId, totalItems, paymentMethod, shippingAddress } = req.body;
    console.log("Creating cart with:", req.body);

    const itemData = await productModel.findById(itemId);
    const userData = await userModel.findById(userId).select("-password");

    if (!itemData || !userData) {
      console.log("Missing item or user:", itemData, userData);
      return res.status(404).json({ success: false, message: "Item or user not found" });
    }

    if (totalItems > itemData.stock_quantity || totalItems > 20) {
      return res.status(400).json({
        success: false,
        message: "Max quantity is 20 products per cart or insufficient stock",
      });
    }

    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 5);

    const data = {
      userId,
      itemId,
      totalItems,
      paymentMethod,
      shippingAddress,
      status: "processing",
      itemData,
      userData,
      totalPrice: itemData.price * totalItems,
      paymentStatus: false,
      deliveryDate,
    };

    const newCart = new cartModel(data);
    let cart;
    try {
      cart = await newCart.save();
    } catch (saveErr) {
      console.error("Error saving cart:", saveErr);
      return res.status(500).json({ success: false, message: "Database error" });
    }

    await productModel.findByIdAndUpdate(
      itemId,
      { stock_quantity: itemData.stock_quantity - totalItems },
      { new: true }
    );

    res.json({
      success: true,
      message: "Cart created successfully",
      cartData: cart,
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export {
  removeCart,
  getCarts,
  changeStatus,
  listCart,
  cancelOrder,
  createCart,
};
