const Razorpay = require('razorpay');
const crypto = require('crypto');
const User = require('../models/User');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

exports.createOrder = async (req, res) => {
  const { plan } = req.body;
  const amounts = { monthly: 50000, "half-yearly": 250000, yearly: 450000 }; // In paise
  
  const options = {
    amount: amounts[plan],
    currency: "INR",
    receipt: `receipt_${Date.now()}`
  };
  
  const order = await razorpay.orders.create(options);
  res.json(order);
};

exports.verifyPayment = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, plan } = req.body;
  const sign = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSign = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET).update(sign).digest("hex");

  if (razorpay_signature === expectedSign) {
    await User.findByIdAndUpdate(req.userId, { isPremium: true, subscriptionPlan: plan });
    res.json({ message: "Payment successful" });
  } else {
    res.status(400).json({ message: "Invalid signature" });
  }
};