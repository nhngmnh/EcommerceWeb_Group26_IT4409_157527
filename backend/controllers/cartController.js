import Cart from "../model/cartModel.js";
import Product from "../model/productModel.js";

const getCart = async (req, res) => {
  const userId = req.userId || req.body.userId;
  try {
    const cart = await Cart.findOne({ userId }).populate("items.productId");
    if (!cart) return res.json({ success: true, items: [] });
    res.json({ success: true, items: cart.items });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const addToCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;
  try {
    const product = await Product.findById(productId);
    if (!product)
      return res.json({ success: false, message: "Sản phẩm không tồn tại" });

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [{ productId, quantity }] });
    } else {
      const index = cart.items.findIndex(
        (item) => item.productId.toString() === productId
      );
      if (index >= 0) {
        cart.items[index].quantity += quantity;
      } else {
        cart.items.push({ productId, quantity });
      }
    }

    await cart.save();
    res.json({ success: true, cart });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const removeFromCart = async (req, res) => {
  const { userId, productId } = req.body;
  try {
    const cart = await Cart.findOne({ userId });
    if (!cart)
      return res.json({ success: false, message: "Không tìm thấy giỏ hàng" });

    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId
    );
    await cart.save();
    res.json({ success: true, cart });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const updateCartItem = async (req, res) => {
  const { userId, productId, quantity } = req.body;
  try {
    const cart = await Cart.findOne({ userId });
    if (!cart)
      return res.json({ success: false, message: "Không tìm thấy giỏ hàng" });

    const item = cart.items.find(
      (item) => item.productId.toString() === productId
    );
    if (!item)
      return res.json({
        success: false,
        message: "Sản phẩm không có trong giỏ",
      });

    item.quantity = quantity;
    await cart.save();
    res.json({ success: true, cart });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export { getCart, addToCart, removeFromCart, updateCartItem };
