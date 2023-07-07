import mongoose, { Types } from "mongoose";
import Company from "./Company";

const Schema = mongoose.Schema;

const PromotionSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  company: {
    type: Schema.Types.ObjectId,
    ref: "Company",
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => Company.findById(value),
      message: "Company does not exist",
    },
  },
  description: {
    type: String,
    required: true,
  },
  image: String,
});

const Promotion = mongoose.model("Promotion", PromotionSchema);
export default Promotion;
