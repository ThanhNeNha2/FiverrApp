import User from "../model/User.model";
import jwt from "jsonwebtoken";
import createError from "../utils/createError";

export const getUser = async (req, res, next) => {
  const user = await User.findById(req.params.id);

  res.status(200).send(user);
};

export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const findUser = await User.findById(id);

    if (req.userId !== findUser._id.toString()) {
      return next(createError(403, "Your can delete only your account! "));
      // res.status(403).send("Your can delete only your account! ");
    }
    const user = await User.deleteOne({ _id: id });
    // res.status(200).json({
    //   errCode: 0,
    //   messErr: "Delete User Success!",
    //   user: user,
    // });
    return next(createError(200, "Delete User success"));
  } catch (error) {
    next(error);
    // res.status(500).json({
    //   errCode: -1,
    //   messErr: "Delete User Failed !",
    // });
  }
};
