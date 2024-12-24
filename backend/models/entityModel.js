import mongoose from "mongoose";

const entitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  created: { type: Date, default: Date.now },
});

const entityModel =
  mongoose.model.entity || mongoose.model("entity", entitySchema);

console.log("entityModel Called");
console.log(mongoose.model);
export default entityModel;
