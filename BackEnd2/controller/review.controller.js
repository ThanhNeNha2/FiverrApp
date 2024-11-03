import createError from "../utils/createError";
import Review from "../model/Review.model";
export const createReview = async (req, res, next) => {
  try {
    const id = req.userId;
    const body = req.body;

    const newReview = await Review.create({ ...body, userId: id });
    return res.status(200).json(newReview);
  } catch (error) {
    next(createError(error));
  }
};

export const getReviews = async (req, res, next) => {
  try {
    const id = req.params.gigId;

    const getReviews = await Review.find({ gigId: id });
    return res.status(200).json(getReviews);
  } catch (error) {
    next(createError(error));
  }
};
export const deleteReview = async (req, res, next) => {
  try {
    const id = req.params.id;
    const deleteReview = await Review.deleteOne({ _id: id });
    return res.status(200).json(deleteReview);
  } catch (error) {
    next(createError(error));
  }
};
