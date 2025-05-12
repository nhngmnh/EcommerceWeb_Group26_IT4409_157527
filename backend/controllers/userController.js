import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.json({ success: false, message: "Missing Details" });
    }
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Invalid email" });
    }
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter strong password",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const userData = { name: username, email, password: hashedPassword };
    const newUser = new userModel(userData);
    const user = await newUser.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    return res.json({ success: true, token });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User does not exist" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      return res.json({ success: true, token });
    } else {
      return res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

const getProfile = async (req, res) => {
  try {
    const { userId } = req.body;
    const userData = await userModel.findById(userId).select("-password");
    res.json({ success: true, userData });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { userId, name, phone, address, dob, gender } = req.body;
    const imageFile = req.file;
    if (!name || !phone || !dob || !gender || !address) {
      return res.json({ success: false, message: "Missing data" });
    }
    await userModel.findByIdAndUpdate(userId, {
      name,
      phone,
      address,
      dob,
      gender,
    });
    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
      const imageUrl = imageUpload.secure_url;
      await userModel.findByIdAndUpdate(userId, { image: imageUrl });
    }
    res.json({ success: true, message: "Profile updated" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export { registerUser, loginUser, getProfile, updateProfile };
