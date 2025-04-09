import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
  try {
    const { token } = req.headers;

    if (!token) {
      return res.json({
        success: false,
        message: "ừm hứm! Hình như mày không có quyền làm cái này thì phải!",
      });
    }
    const token_decode = jwt.verify(token, process.env.JWT_SECE);
    if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
      return res.json({
        success: false,
        message: "ừm hứm! ừm hứm! Hình như đây không phải là Admin",
      });
    }
    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
export default adminAuth;
