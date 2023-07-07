import express from "express";
import Category from "../models/Category";
import auth from "../middleware/auth";
import { CategoryWithoutId } from "../types";
import mongoose from "mongoose";
import permit from "../middleware/permit";
import Company from "../models/Company";

const categoriesRouter = express.Router();

categoriesRouter.get("/", async (req, res, next) => {
  try {
    const categories = await Category.find().populate("parent");
    return res.send(categories);
  } catch (e) {
    return next(e);
  }
});

categoriesRouter.post("/", auth, permit("admin"), async (req, res, next) => {
  const categoryData: CategoryWithoutId = {
    title: req.body.title,
    parent: req.body.parent ? req.body.parent : null,
  };

  const category = new Category(categoryData);

  try {
    await category.save();
    return res.send(category);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    } else {
      return next(e);
    }
  }
});

categoriesRouter.delete(
  "/:id",
  auth,
  permit("admin"),
  async (req, res, next) => {
    try {
      const category = await Category.findOne({ _id: req.params.id });
      if (category) {
        const companies = await Company.find({ categories: category._id });
        console.log(companies);
        if (companies.length > 0) {
          return res.send(
            "Категория не может быть удалена, так как есть привязанные к ней компании"
          );
        }
        await Category.deleteOne({ _id: category._id });
        return res.send("Category deleted");
      }
    } catch (e) {
      return next(e);
    }
  }
);

export default categoriesRouter;
