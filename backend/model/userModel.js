import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Họ tên không được để trống"],
      trim: true,
      minlength: [2, "Tên quá ngắn"],
      maxlength: [50, "Tên quá dài"],
    },
    email: {
      type: String,
      required: [true, "Email không được để trống"],
      trim: true,
      lowercase: true,
      unique: true,
      match: [/.+\@.+\..+/, "Email không hợp lệ"],
    },
    password: {
      type: String,
      required: [true, "Mật khẩu không được để trống"],
      minlength: [8, "Mật khẩu phải ít nhất 8 ký tự"],
    },
  },
  { timestamps: true, minimize: false }
);

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;
