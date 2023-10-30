import asyncHandler from "../middleware/asyncHandler.js";
import Medicine from "../models/medModel.js";
import Order from "../models/orderModel.js";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  let medId = "";
  let stock = 0;

  orderItems.map((x) => {
    medId = x._id;
    stock = x.countInStock - x.qty;
  });

  console.log(medId);
  console.log(stock);

  const medicine = await Medicine.findById(medId);

  if (medicine) {
    medicine.countInStock = stock;
    medicine.save();
  }

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
  } else {
    const order = new Order({
      orderItems: orderItems.map((x) => ({
        ...x,
        med: x._id,
        _id: undefined,
      })),
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      totalPrice,
    });

    console.log(order);
    console.log(medicine);

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  }
});

// @desc    Get logged in user orders
// @route   GET /api/orders/mine
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.status(200).json(orders);
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc    Update order to delivered
// @route   GET /api/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate("user", "id name");
  res.json(orders);
});

// @desc    pay orders
// @route   GET /api/orders/:id/payment
// @access  Private
const MakePayment = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  const id = req.params.id;
  const formData = {
    cus_name: order.shippingAddress.name,
    cus_email: "aamarpaytest@gmail.com",
    cus_phone: order.shippingAddress.contact,
    amount: order.totalPrice,
    tran_id: uuidv4(),
    signature_key: "dbb74894e82415a2f7ff0ec3a97e4183",
    store_id: "aamarpaytest",
    currency: "BDT",
    desc: order.orderItems[0].name,
    cus_add1: order.shippingAddress.address,
    cus_add2: "Dhaka",
    cus_city: "Dhaka",
    cus_country: "Bangladesh",
    opt_a: id,
    success_url: "http://localhost:5000/api/orders/callback",
    fail_url: "http://localhost:5000/api/orders/callback",
    cancel_url: "http://localhost:5000/api/orders/callback",
    type: "json", //This is must required for JSON request
  };

  const { data } = await axios.post(
    "https://sandbox.aamarpay.com/jsonpost.php",
    formData
  );

  console.log(formData);

  if (data.result !== "true") {
    let errorMessage = "";
    for (let key in data) {
      errorMessage += data[key] + ". ";
    }
    return res.render("error", {
      title: "Error",
      errorMessage,
    });
  }
  res.json(data);
});

// @desc    callback payment
// @route   GET /api/orders/callback
// @access  Private
const callback = asyncHandler(async (req, res) => {
  const {
    pay_status,
    cus_name,
    cus_phone,
    cus_email,
    currency,
    pay_time,
    amount,
    opt_a,
  } = req.body;

  const order = await Order.findById(opt_a);

  if (order && pay_status === "Successful") {
    order.isPaid = true;
    order.paidAt = Date.now();
    
    await order.save();
  } else {
    res.status(404);
    throw new Error("Order not found");
  }

  let baseUrl = "http://localhost:3000";
  let url = "/success";
  let queryParams = `?cus_name=${cus_name}&pay_time=${pay_time}&amount=${amount}&pay_status=${pay_status}&cus_phone=${cus_phone}&currency=${currency}&opt_a=${opt_a}`;
  res.redirect(301, `${baseUrl}${url}/${queryParams}`);
});

export {
  addOrderItems,
  getMyOrders,
  MakePayment,
  callback,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
};
