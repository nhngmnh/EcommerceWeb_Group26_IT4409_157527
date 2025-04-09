import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../model/userModel.js";
import jwt from "jsonwebtoken";
import { json } from "express";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECE);
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({
        success: false,
        message: "Mày đã chắc là mày nhập đúng email chưa",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = createToken(user._id);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Sai mật khẩu rồi ba!" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exists = await userModel.findOne({ email });

    if (exists) {
      return res.json({
        success: false,
        message: "Tên tài khoản đã được sử dụng",
      });
    }
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Email không hợp lệ" });
    }
    if (password.lenght < 8) {
      return res.json({ success: false, message: "Mật khẩu chưa đủ wow!" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();

    const token = createToken(user._id);

    res.json({ success: false, token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECE);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Không phải admin" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { loginUser, registerUser, adminLogin };
