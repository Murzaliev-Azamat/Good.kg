import mongoose, { Types } from "mongoose";
import Category from "./Category";
const Schema = mongoose.Schema;

const CompanySchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  categories: [
    {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
      validate: {
        validator: async (value: Types.ObjectId) => Category.findById(value),
        message: "Category does not exist",
      },
    },
  ],
  createdAt: {
    type: Date,
    required: true,
  },
  description: String,
  image: String,
  link: String,
});

const Company = mongoose.model("Company", CompanySchema);
export default Company;
