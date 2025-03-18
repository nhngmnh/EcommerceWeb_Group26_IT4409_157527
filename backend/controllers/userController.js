import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../model/userModel.js";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECE);
};

const loginUser = async (req, res) => {};

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

    const salt = await bcrypt.getSalt(10);
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
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

const adminLogin = async (req, res) => {};

export { loginUser, registerUser, adminLogin };
