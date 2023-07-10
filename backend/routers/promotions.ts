import express from "express";
import auth from "../middleware/auth";
import permit from "../middleware/permit";
import { imagesUpload } from "../multer";
import { PromotionWithoutId } from "../types";
import mongoose, { Types } from "mongoose";
import Promotion from "../models/Promotion";
import Company from "../models/Company";

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
      console.log(promotions);
      return res.send(promotions);
    }

    // let query = Promotion.find();
    //
    // if (categoryId && limit && page && limit !== "" && page !== "") {
    //   const skip = (parseInt(page) - 1) * parseInt(limit);
    //   query = query
    //     .populate({
    //       path: "company",
    //       populate: {
    //         path: "categories",
    //         model: "Category",
    //       },
    //     })
    //     // .where("company.categories._id")
    //     // .equals(categoryId)
    //     .limit(parseInt(limit))
    //     .skip(skip);
    // }
    //
    // const promotions = await query.exec();
    // console.log(promotions);
    // return res.send(promotions);
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
