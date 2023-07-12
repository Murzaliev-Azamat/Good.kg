import express from "express";
import auth, { RequestWithUser } from "../middleware/auth";
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
    let query = Promotion.find().populate("company");

    if (limit && page && limit !== "" && page !== "") {
      const skip = (parseInt(page) - 1) * parseInt(limit);
      query = query.limit(parseInt(limit)).skip(skip);
    }
    const promotions = await query.exec();
    return res.send(promotions);
  } catch (e) {
    return next(e);
  }
});

promotionsRouter.get("/category", async (req, res, next) => {
  const categoryId = req.query.categoryId;
  const limit = req.query.limit as string;
  const page = req.query.page as string;

  try {
    if (categoryId && limit && page && limit !== "" && page !== "") {
      const skip = (parseInt(page) - 1) * parseInt(limit);
      const aggregationPipeline = [
        {
          $lookup: {
            from: "companies",
            localField: "company",
            foreignField: "_id",
            as: "company",
          },
        },
        {
          $unwind: "$company",
        },
        {
          $lookup: {
            from: "categories",
            localField: "company.categories",
            foreignField: "_id",
            as: "company.categories",
          },
        },
        {
          $match: {
            "company.categories._id": new mongoose.Types.ObjectId(
              categoryId as string
            ),
          },
        },
        {
          $skip: skip,
        },
        {
          $limit: parseInt(limit),
        },
      ];

      const promotions = await Promotion.aggregate(aggregationPipeline).exec();
      return res.send(promotions);
    }
  } catch (e) {
    return next(e);
  }
});

promotionsRouter.get("/search", async (req, res, next) => {
  const searchQuery = req.query.search;
  const limit = req.query.limit as string;
  const page = req.query.page as string;

  try {
    let query = Promotion.find();

    if (searchQuery && limit && page && limit !== "" && page !== "") {
      query = query.or([
        { title: { $regex: searchQuery, $options: "i" } },
        { description: { $regex: searchQuery, $options: "i" } },
      ]);
      const skip = (parseInt(page) - 1) * parseInt(limit);
      query = query.limit(parseInt(limit)).skip(skip);
    }

    const promotions = await query.exec();
    return res.send(promotions);
  } catch (e) {
    return next(e);
  }
});

promotionsRouter.get("/companyId/:id", async (req, res, next) => {
  try {
    const promotions = await Promotion.find({ company: req.params.id });
    return res.send(promotions);
  } catch (e) {
    return next(e);
  }
});

promotionsRouter.get("/:id", async (req, res, next) => {
  try {
    const promotion = await Promotion.findById(req.params.id);
    return res.send(promotion);
  } catch (e) {
    return next(e);
  }
});

promotionsRouter.post(
  "/",
  auth,
  permit("admin"),
  imagesUpload.single("image"),
  async (req, res, next) => {
    console.log(req.body.isBirthday);
    const promotionData: PromotionWithoutId = {
      title: req.body.title,
      company: req.body.company,
      description: req.body.description ? req.body.description : null,
      image: req.file ? req.file.filename : null,
      isAlways: req.body.isAlways,
      createdAt: new Date(),
      startDate: req.body.startDate ? req.body.startDate : null,
      endDate: req.body.endDate ? req.body.endDate : null,
      isBirthday: req.body.isBirthday,
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

promotionsRouter.patch("/:id/toggleLike", auth, async (req, res, next) => {
  try {
    const user = (req as RequestWithUser).user;
    const promotion = await Promotion.findOne({ _id: req.params.id });
    if (promotion) {
      const isUserLiked = promotion.userLikes.includes(user._id.toString());

      let updatedRating;
      let updatedUserLikes;

      if (isUserLiked) {
        updatedRating = promotion.rating - 1;
        updatedUserLikes = promotion.userLikes = promotion.userLikes.filter(
          (userId) => userId !== user._id.toString()
        );
      } else {
        updatedRating = promotion.rating + 1;
        updatedUserLikes = [...promotion.userLikes, user._id.toString()];
      }

      await Promotion.updateOne(
        { _id: promotion._id },
        {
          rating: updatedRating,
          userLikes: updatedUserLikes,
        }
      );

      const updatedPromotion = await Promotion.findOne({ _id: promotion._id });
      return res.send(updatedPromotion);
    }
  } catch (e) {
    return next(e);
  }
});

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
