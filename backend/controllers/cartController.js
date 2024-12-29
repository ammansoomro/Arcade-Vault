import userModel from "../models/userModel.js";

const updateCart = async (req, res, action) => {
  try {
    const { userId, itemId } = req.body;

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    const cartData = user.cartData || {};

    if (action === "add") {
      cartData[itemId] = (cartData[itemId] || 0) + 1;
    } else if (action === "remove") {
      if (cartData[itemId] > 0) {
        cartData[itemId] -= 1;
        if (cartData[itemId] === 0) delete cartData[itemId];
      }
    }

    await userModel.findByIdAndUpdate(userId, { cartData });

    res.status(200).json({
      success: true,
      message:
        action === "add" ? "Item added to cart" : "Item removed from cart",
    });
  } catch (error) {
    console.error("Error updating cart:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update cart.",
    });
  }
};

// Add to Cart
const addToCart = (req, res) => updateCart(req, res, "add");

// Remove from Cart
const removeFromCart = (req, res) => updateCart(req, res, "remove");

// Get Cart
const getCart = async (req, res) => {
  try {
    const { userId } = req.body;

    // Fetch user data
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // Return cart data
    const cartData = user.cartData || {};
    res.status(200).json({
      success: true,
      cartData,
    });
  } catch (error) {
    console.error("Error retrieving cart:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve cart.",
    });
  }
};

export { addToCart, removeFromCart, getCart };
