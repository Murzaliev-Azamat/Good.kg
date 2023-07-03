import mongoose, { Types } from "mongoose";

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  title: {
    type: String,
    required: true,
    validate: {
      validator: async (value: string) => {
        const category = await Category.find({ title: value });
        if (category.length > 0) {
          return false;
        }
      },
      message: "Category already exist",
    },
  },
  parent: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    validate: {
      validator: async (value: Types.ObjectId) => Category.findById(value),
      message: "Category does not exist",
    },
  },
});

const Category = mongoose.model("Category", CategorySchema);
export default Category;
