import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// * Place Order
const placeOrder = async (req, res) => {
  const FRONTEND_URL = process.env.FRONTEND_URL;
  const DELIVERY_CHARGES = 2 * 100;

  try {
    const { userId, items, amount, address } = req.body;

    // Step 1: Create a new order and save it
    const newOrder = await createOrder({ userId, items, amount, address });

    // Step 2: Clear the user's cart
    await clearUserCart(userId);

    // Step 3: Prepare line items for Stripe
    const lineItems = prepareLineItems(items, DELIVERY_CHARGES);

    // Step 4: Create a Stripe Checkout session
    const session = await createCheckoutSession(
      lineItems,
      newOrder._id,
      FRONTEND_URL
    );

    // Step 5: Send response
    res.status(200).json({
      success: true,
      session_url: session.url,
    });
  } catch (error) {
    console.log("Error placing order:", error.message);
    res.status(500).json({
      success: false,
      message: "An error occurred while placing the order",
    });
  }
};

//  Function to Create a New Order
const createOrder = async ({ userId, items, amount, address }) => {
  const newOrder = new orderModel({ userId, items, amount, address });
  return await newOrder.save();
};

//  Function to Clear User's Cart
const clearUserCart = async (userId) => {
  return await userModel.findByIdAndUpdate(userId, { cartData: {} });
};

//  Function to Prepare Line Items for Stripe
const prepareLineItems = (items, deliveryCharges) => {
  // Ensure items is a valid array
  if (!Array.isArray(items) || items.length === 0) {
    throw new Error("Items array is empty or invalid");
  }

  // Map over the items to create line items
  const lineItems = items.map((item) => {
    if (!item.name || !item.price || !item.quantity) {
      throw new Error(
        `Invalid item data: Name, price, and quantity are required. Received: ${JSON.stringify(
          item
        )}`
      );
    }

    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100, // Stripe expects the amount in cents
      },
      quantity: item.quantity,
    };
  });

  // Add delivery charges as an additional line item
  lineItems.push({
    price_data: {
      currency: "usd",
      product_data: {
        name: "Delivery Charges",
      },
      unit_amount: deliveryCharges,
    },
    quantity: 1, // Add quantity for consistency
  });

  return lineItems;
};

//  Function to Create Stripe Checkout Session
const createCheckoutSession = async (lineItems, orderId, frontendUrl) => {
  return await stripe.checkout.sessions.create({
    line_items: lineItems,
    mode: "payment",
    success_url: `${frontendUrl}/verify?success=true&orderId=${orderId}`,
    cancel_url: `${frontendUrl}/verify?success=false&orderId=${orderId}`,
  });
};

// * Verify Order
const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;
  try {
    if (success == "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      res.status(200).json({
        success: true,
        message: "Paid",
      });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.status(400).json({
        success: false,
        message: "Payment Failed",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "Error",
    });
  }
};

export { placeOrder, verifyOrder };
