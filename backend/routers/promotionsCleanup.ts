import Promotion from "../models/Promotion";
import cron from "node-cron";

// Создайте функцию для удаления документов с прошедшей датой endDate
const removeExpiredPromotions = async () => {
  const currentDate = new Date();
  const oneMinuteAgo = new Date(currentDate.getTime() - 60 * 1000);
  try {
    const removedPromotionsResult = await Promotion.deleteMany({
      endDate: { $lt: currentDate },
    });
    console.log(
      `Удалено ${removedPromotionsResult.deletedCount} просроченных акций.`
    );

    const updatedFreshStatusResult = await Promotion.updateMany(
      { isFresh: true, createdAt: { $lt: oneMinuteAgo } },
      { $set: { isFresh: false } }
    );
    console.log(
      `Обновлено ${updatedFreshStatusResult.modifiedCount} акций из-за истечения срока свежести.`
    );
  } catch (error) {
    console.error("Ошибка при удалении просроченных акций:", error);
  }
};

cron.schedule("* * * * *", removeExpiredPromotions);

export default removeExpiredPromotions;
