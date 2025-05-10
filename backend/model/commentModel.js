import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    userData: { type: Object, required: true },
    productId: { type: String, required: true },
    productData: { type: Object, required: true },
    rating: { type: Number, min: 1, max: 5, default: null },
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

const commentModel =
  mongoose.models.comment || mongoose.model("comment", commentSchema);
export default commentModel;
