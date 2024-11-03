import createError from "../utils/createError";
import Conversation from "../model/Conversation.model";

// CREATE

export const createConversation = async (req, res, next) => {
  try {
    const newConversation = new Conversation({
      // b1 : kiểm tra xem nó phải là người bán không
      // b2 : nếu không phải là người bán thì nó là user và ( req.body.to + req.userId )
      // b3 : nó cộng nhưng cộng với id của user nằm ở sau
      id: req.isSeller ? req.userId + req.body.to : req.body.to + req.userId,
      sellerId: req.isSeller ? req.userId : req.body.to,
      buyerId: req.isSeller ? req.body.to : req.userId,

      // b1 :  cái này nếu là req.isSeller == false  có nghĩa là user
      // b2 :  nó sẽ giữ nguyên readBySeller = false  vì false thì có nghĩa là người bán chưa đọc
      // b3 :   readByBuyer thì ngược lại vì là người gửi tin  nên  nó sẽ là true ( true là đã send )
      readBySeller: req.isSeller,
      readByBuyer: !req.isSeller,
    });
    const savedConversation = await newConversation.save();
    res.status(201).send(savedConversation);
  } catch (error) {
    next(createError(error));
  }
};

// GET ALL

export const getConversations = async (req, res, next) => {
  try {
    const conversations = await Conversation.find(
      req.isSeller ? { sellerId: req.userId } : { buyerId: req.userId }
    ).sort({ updatedAt: -1 });
    res.status(200).send(conversations);
  } catch (error) {
    next(createError(error));
  }
};

// GET ONE

export const getSingleConversation = async (req, res, next) => {
  try {
    const conversation = await Conversation.findOne({ id: req.params.id });
    if (!conversation) return next(createError(404, "Not found!"));
    res.status(200).send(conversation);
  } catch (error) {
    next(createError(error));
  }
};

// UPDATE

export const updateConversation = async (req, res, next) => {
  try {
    const updatedConversation = await Conversation.findOneAndUpdate(
      { id: req.params.id },
      {
        $set: {
          // readBySeller: true,
          // readByBuyer: true,
          // nếu là người bán hàng thì chuyển ( thông tin của người bán thành đã đọc = true ngược lại thông tin của người mua đã đọc = true )
          ...(req.isSeller ? { readBySeller: true } : { readByBuyer: true }),
        },
      },
      { new: true }
    );

    res.status(200).send(updatedConversation);
  } catch (error) {
    next(createError(error));
  }
};
