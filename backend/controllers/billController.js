import billModel from "../model/billModel.js";

const createBill = async (req, res) => {
  try {
    const { items, totalAmount } = req.body;
    const userId = req.userId;

    if (!items || items.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Giỏ hàng rỗng!" });
    }

    const newBill = new billModel({ userId, items, totalAmount });
    await newBill.save();

    res.status(201).json({
      success: true,
      message: "Tạo hóa đơn thành công!",
      bill: newBill,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getUserBills = async (req, res) => {
  try {
    const userId = req.userId;
    const bills = await billModel.find({ userId }).sort({ createdAt: -1 });
    res.json({ success: true, bills });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getAllBills = async (req, res) => {
  try {
    const bills = await billModel.find().populate("userId", "name email");
    res.json({ success: true, bills });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export { createBill, getUserBills, getAllBills };
