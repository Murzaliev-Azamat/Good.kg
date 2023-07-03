import mongoose from "mongoose";

const Schema = mongoose.Schema;

const PromotionSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: String,
});

const Promotion = mongoose.model("Promotion", PromotionSchema);
export default Promotion;
