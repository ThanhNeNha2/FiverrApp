import Gig from "../model/Gig.model";
import createError from "../utils/createError";

//  CREATE GIG
export const createGig = async (req, res, next) => {
  if (!req.isSeller) {
    return next(createError(403, "Only sellers can create a gig!"));
  }

  try {
    const newGig = new Gig({
      userId: req.userId,
      ...req.body,
    });
    const saveGig = await newGig.save();
    return res.status(201).json({ mess: "Create gig success ", saveGig });
  } catch (error) {
    next(error);
  }
};

// GET ALL GIG
export const getGigs = async (req, res, next) => {
  try {
    const q = req.query;
    const filters = {
      ...(q.userId && { userId: q.userId }),
      ...(q.cat && { cat: q.cat }),
      ...((q.min || q.max) && {
        price: { ...(q.min && { $gt: q.min }), ...(q.max && { $lt: q.max }) },
      }),

      ...(q.search && { title: { $regex: q.search, $options: "i" } }),
    };
    // kq filters
    // filters {
    //   cat: 'design',
    //   price: { '$gt': '50' },
    //   title: { '$regex': 'Gig 2', '$options': 'i' }
    // }

    const getAll = await Gig.find(filters).sort({ [q.sort]: -1 });
    return res.status(201).json(getAll);
  } catch (error) {
    next(error);
  }
};

// GET ONE GIG
export const getGig = async (req, res, next) => {
  try {
    const getGig = await Gig.findOne({ _id: req.params.id });
    return res.status(201).json(getGig);
  } catch (error) {
    next(error);
  }
};

// DELETE GIG
export const deleteGig = async (req, res, next) => {
  try {
    const id = req.params.id;
    const gig = await Gig.findById(id).exec();

    if (gig.userId !== req.userId) {
      return next(createError(403, "You can delete only your gig"));
    }

    const deleteGig = await Gig.deleteOne({ _id: req.params.id });
    return res.status(201).json({ mess: " Delete success ", deleteGig });
  } catch (error) {
    next(error);
  }
};
