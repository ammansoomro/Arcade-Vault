import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
  },
  image: {
    type: String,
    required: true,
  },
  created: { type: Date, default: Date.now },
});

const categoryModel =
  mongoose.model.category || mongoose.model("category", categorySchema);

export default categoryModel;
