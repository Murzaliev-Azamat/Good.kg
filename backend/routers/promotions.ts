import express from "express";
import auth from "../middleware/auth";
import permit from "../middleware/permit";
import { imagesUpload } from "../multer";
import { PromotionWithoutId } from "../types";
import mongoose from "mongoose";
import Promotion from "../models/Promotion";

const promotionsRouter = express.Router();

export default promotionsRouter;

promotionsRouter.get("/", async (req, res, next) => {
  const limit = req.query.limit as string;
  const page = req.query.page as string;

  try {
    let query = Promotion.find();

    if (limit && page) {
      const skip = (parseInt(page) - 1) * parseInt(page);
      query = query.limit(parseInt(limit)).skip(skip);
    }
    const promotions = await query.exec();
    return res.send(promotions);
  } catch (e) {
    return next(e);
  }
});

promotionsRouter.get("/", async (req, res, next) => {
  const categoryId = req.query.categoryId;
  const limit = req.query.limit as string;
  const page = req.query.page as string;

  try {
    let query = Promotion.find();

    if (categoryId) {
      query = query.where("categories").equals(categoryId);
    }

    if (limit && page) {
      const skip = (parseInt(page) - 1) * parseInt(page);
      query = query.limit(parseInt(limit)).skip(skip);
    }

    const promotions = await query.exec();
    return res.send(promotions);
  } catch (e) {
    return next(e);
  }
});

// companiesRouter.get("/:id", async (req, res, next) => {
//   try {
//     const albums = await Album.findById(req.params.id).populate("artist");
//     return res.send(albums);
//   } catch (e) {
//     return next(e);
//   }
// });

promotionsRouter.post(
  "/",
  auth,
  permit("admin"),
  imagesUpload.single("image"),
  async (req, res, next) => {
    const promotionData: PromotionWithoutId = {
      title: req.body.title,
      company: req.body.company,
      description: req.body.description ? req.body.description : null,
      image: req.file ? req.file.filename : null,
      rating: req.body.rating,
    };

    const promotion = new Promotion(promotionData);

    try {
      await promotion.save();
      return res.send(promotion);
    } catch (e) {
      if (e instanceof mongoose.Error.ValidationError) {
        return res.status(400).send(e);
      } else {
        return next(e);
      }
    }
  }
);

promotionsRouter.delete(
  "/:id",
  auth,
  permit("admin"),
  async (req, res, next) => {
    try {
      const promotion = await Promotion.findOne({ _id: req.params.id });
      if (promotion) {
        await Promotion.deleteOne({ _id: promotion._id });
        return res.send("Promotion deleted");
      }
    } catch (e) {
      return next(e);
    }
  }
);
