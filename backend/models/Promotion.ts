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
  isAlways: {
    type: Boolean,
    required: true,
    default: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  startDate: Date,
  endDate: Date,
  isBirthday: {
    type: Boolean,
    required: true,
    default: false,
  },
  isFresh: {
    type: Boolean,
    required: true,
    default: true,
  },
  rating: {
    type: Number,
    required: true,
    default: 0,
  },
  canLike: {
    type: Boolean,
    required: true,
    default: true,
  },
  userLikes: [String],
});

const Promotion = mongoose.model("Promotion", PromotionSchema);
export default Promotion;
