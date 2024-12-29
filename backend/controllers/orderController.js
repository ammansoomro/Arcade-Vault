import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Place Order
const placeOrder = async (req, res) => {
  const FRONTEND_URL = "http://localhost:5173";
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
  const lineItems = items.map((item) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: item.name,
      },
      unit_amount: item.price * 100, // Stripe expects the amount in cents
    },
    quantity: item.quantity,
  }));

  // Add delivery charges
  lineItems.push({
    price_data: {
      currency: "usd",
      product_data: {
        name: "Delivery Charges",
      },
      unit_amount: deliveryCharges,
    },
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

export { placeOrder };
