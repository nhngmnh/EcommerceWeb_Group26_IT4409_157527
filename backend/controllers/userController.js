import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import {v2 as cloudinary} from 'cloudinary'
import jwt from "jsonwebtoken";
import { addPendingForgot, getPendingForgot, removePendingForgot } from "../utils/pendingForgot.js";
import { addPendingUser, getPendingUser, removePendingUser } from "../utils/pendingUser.js";
import { sendEmail } from "../utils/sendEmail.js";

const registerUser = async (req,res) =>{
try {
   
    const {username,email,password}=req.body 
    const data= await userModel.findOne({email});
    if (data) return res.json({success:false,message:"Tài khoản email đã tồn tại !"})
    if (!username || !email || !password){
        return res.json({success:false,message:"Missing Details"}) // missing sth
    }
    if (!validator.isEmail(email)) // invalid email
    {
        return res.json({success:false,message:"Invalid email"})
    }
    if (password.length<8){  //weak password
        return res.json({success:false,message:"Please enter strong password"}) 
    }
    console.log({username,email});
    
    // HAShing USER PASSWORD
    const salt = await bcrypt.genSalt(10)
    const hashedPassword=await bcrypt.hash(password,salt)
    const userData={
        name:username,
        email,
        password:hashedPassword
    }
    // Lưu tạm user
       const tokenGmail=jwt.sign({email,userData},process.env.JWT_SECRET)
    addPendingUser(email, { hashedPassword, tokenGmail });

  // Gửi email
  const verifyLink = `${process.env.FE_URL}/verify?tokenGmail=${tokenGmail}`;
  await sendEmail(email, 'Xác thực tài khoản trên website Web26', `Nhấn vào đây để xác thực: ${verifyLink}`);

  return res.json({success:true, message:"Vui lòng kiểm tra email để xác thực"});
    
   
} catch (error) {
    console.log(error)
    return res.json({success:false,message:"Lỗi đăng ký"});
}}

const verify = async (req,res) =>{
    try {
        const tokenGmail= req.query.tokenGmail;
        if (!tokenGmail) return res.status(400).json({success:false,message:"Không thấy gmail!"})
        const decoded = jwt.verify(tokenGmail, process.env.JWT_SECRET); // kiểm tra hạn 15 phút
       
        const email = decoded.email;
        const userData=decoded.userData;
        console.log({email,userData});
        
        const pending = getPendingUser(email);

    if (!pending) {
      return res.status(400).send('Token đã hết hạn.');
    }
    console.log(pending.tokenGmail);
    
    if (pending.tokenGmail!==tokenGmail) return res.status(400).send('Token không có');
        const newUser= new userModel(userData);

        const user= await newUser.save();

        const token=jwt.sign({id:user._id},process.env.JWT_SECRET);
        // Xóa khỏi pending
        removePendingUser(email);
        return res.json({success:true,token})
    } catch (error) {
        console.log(error)
        return res.json({success:false,message:"Lỗi xác thực"});
    }
}
//api for forgot password
const forgotPassword = async (req,res)=>{
    try {
        const email=req.body.email
        if (!email) return res.json({success:false,message:"Không tìm thấy email"})
        const userData= await userModel.findOne({email}).select('-password');
    
        if (!userData) return res.json({success:false,message:"Không tồn tại email người dùng"});
         const user_encode=jwt.sign({userId:userData._id},process.env.JWT_SECRET)
         const verifyLink = `${process.env.FE_URL}/changePassword?user=${user_encode}&email=${email}`;
        await sendEmail(email, 'Bạn đã thao tác đổi mật khẩu của tài khoản sử dụng email này trên website MinhGadget', `Nhấn vào đây để thao tác đổi mật khẩu: ${verifyLink}`);
        addPendingForgot(email);
        return res.json({succcess:true,message:"Check email để xác thực thay đổi mật khẩu"})
    } catch (error) {
        console.log(error);
        return res.json({success:false,message:"Lỗi server!"});
    }
}
const deleteUser = async (req,res)=>{
    try {
        const {userId}=req.body
        if (!userId) return res.json({success:false,message:"user id not found !"});
        await userModel.findByIdAndDelete(userId);
        return res.json({success:true,message:"Delete user successfully !"})
    } catch (error) {
        console.log(error);
        return res.json({success:false,message:"Server error!"})
    }
}
const verifyChangePassword = async (req, res) => {
  try {
    const { userId, password } = req.body;
    if (!userId || !password) {
      return res.json({ success: false, message: "Không hợp lệ" });
    }

    let decoded;
    try {
      decoded = jwt.verify(userId, process.env.JWT_SECRET);
    } catch (err) {
      return res.json({ success: false, message: "Token không hợp lệ hoặc đã hết hạn" });
    }

    const realUserId = decoded.userId;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    //console.log(decoded);
    
    //console.log(realUserId);
    
    const user = await userModel.findByIdAndUpdate(realUserId, { password: hashedPassword });

    if (!user) {
      return res.json({ success: false, message: "Không có user thỏa mãn!" });
    }

    removePendingForgot(user.email);

    return res.json({ success: true, message: "Đổi mật khẩu thành công!" });
  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: "Lỗi server!" });
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

export { registerUser, loginUser, getProfile, updateProfile,verify,
    forgotPassword,verifyChangePassword,
    deleteUser };
