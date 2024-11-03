import Order from "../model/Order.model";
import createError from "../utils/createError";
import Gig from "../model/Gig.model";
import Stripe from "stripe";
export const intent = async (req, res, next) => {
  try {
    const stripe = new Stripe(process.env.STRIPE);
    const gig = await Gig.findById(req.params.id);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: gig.price * 100,
      currency: "usd",
      // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
      automatic_payment_methods: {
        enabled: true,
      },
    });

    const newOrder = new Order({
      gigId: gig._id,
      img: gig.cover,
      title: gig.title,
      buyerId: req.userId,
      sellerId: gig.userId,
      price: gig.price,
      payment_intent: paymentIntent.id,
    });
    await newOrder.save();

    res.status(200).send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    next(createError(error));
  }
};

export const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({
      // kiểm tra trong jwt đã lưu nếu có req.isSeller thì ....  nói chung kiểm tra thông tin đã làm trong jwt là lưu vào bộ nhớ rồi
      ...(req.isSeller ? { sellerId: req.userId } : { buyerId: req.userId }),
      isCompleted: true,
    });
    res.status(200).json(orders);
  } catch (error) {
    next(createError(error));
  }
};

// UPDATE LẠI TRẠNG THÁI CỦA MẶT HÀNG

export const confirm = async (req, res, next) => {
  try {
    const orders = await Order.findOneAndUpdate(
      {
        payment_intent: req.body.payment_intent,
      },
      {
        $set: {
          isCompleted: true,
        },
      }
    );

    res.status(200).send("Order has been confirmed.");
  } catch (err) {
    next(err);
  }
};
