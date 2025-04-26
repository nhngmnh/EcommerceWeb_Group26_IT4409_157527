import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  category: { type: String, required: true },
  imageUrl: { type: String, required: true },
  title: { type: String, required: true },
  rating: { type: Number, default: 0.0 },
  originalPrice: { type: Number, required: true },
  discountedPrice: { type: Number, required: true },
  discountPercentage: { type: Number, required: true },
  specifications: {
    type: Map,
    of: mongoose.Schema.Types.Mixed,
    required: true,
  },
});

const productModel =
  mongoose.models.product || mongoose.model("product", productSchema);

export default productModel;
